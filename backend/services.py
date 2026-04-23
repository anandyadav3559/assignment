import os
import json
import logging
from groq import Groq

logger = logging.getLogger(__name__)

class GroqService:
    def __init__(self):
        # Initialize client here to allow for mocking in tests
        self.api_key = os.environ.get("GROQ_API_KEY")
        self.client = Groq(api_key=self.api_key) if self.api_key else None
        self.model = "llama-3.3-70b-versatile"

    def analyze_url(self, url: str) -> dict:
        if not self.client:
            raise ValueError("Groq client not configured")
            
        prompt = f"""
        You are an expert AI agent that analyzes the 'AI Visibility' of developer tools and SaaS platforms.
        Analyze the following URL: {url}
        
        Estimate how well this domain might be optimized for AI Engine Optimization (AEO) and Large Language Models.
        Provide:
        1. An estimated AI Visibility score between 0 and 100.
        2. A very brief feedback message (1-2 sentences) explaining the score.
        
        Return the result strictly as a JSON object with two keys: 'score' (an integer) and 'feedback' (a string). Do not include markdown formatting or backticks.
        """
        
        logger.info(f"Calling Groq API for URL analysis: {url}")
        response = self.client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=self.model,
        )
        text = response.choices[0].message.content.strip()
        
        if text.startswith("```json"): text = text[7:]
        if text.startswith("```"): text = text[3:]
        if text.endswith("```"): text = text[:-3]
            
        return json.loads(text.strip())

    def _verify_quality_with_llm(self, output: str) -> bool:
        prompt = f"Does the following text contain excessive marketing fluff or fail to be 'AI-ready' technical markdown? Answer 'YES' or 'NO' only.\n\nText: {output[:1000]}"
        try:
            response = self.client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model="llama-3.1-8b-instant",
            )
            return "NO" in response.choices[0].message.content.upper()
        except Exception as e:
            logger.warning(f"Quality verification LLM failed: {e}")
            return True # Fail open

    def transform_document(self, text_content: str) -> str:
        if not self.client:
            raise ValueError("Groq client not configured")

        prompt = f"""
        You are an expert AI Documentation Engineer. Your task is to transform the following raw documentation into "AI-ready" markdown content.
        
        Guidelines for AI-ready content:
        - Strip out all marketing fluff, welcoming messages, and unnecessary prose.
        - Structure the content with clear, hierarchical markdown headings.
        - Focus purely on technical signals: API endpoints, configuration details, code structures, types, and architecture.
        - Present information densely so an LLM can consume it efficiently (like an llms.txt file).
        
        Raw Documentation:
        {text_content[:30000]}  # Limit text to avoid excessively large prompts
        
        Output ONLY the final markdown.
        """
        
        logger.info("Calling Groq API for document transformation")
        response = self.client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=self.model,
        )
        
        result = response.choices[0].message.content.strip()
        
        # VERIFICATION LAYER 1: Heuristic / Rule-based Verification
        if "#" not in result:
             logger.warning("LLM failed to include markdown headers in transformation.")
             result = "# Raw Document\n\n" + result
             
        if len(result) < 50 and len(text_content) > 500:
             logger.warning("LLM truncated the document excessively.")
             return text_content[:5000] + "\n\n(Note: Transformation failed, returning raw text)"
             
        # VERIFICATION LAYER 2: LLM-as-a-Judge (Semantic Verification)
        is_high_quality = self._verify_quality_with_llm(result)
        if not is_high_quality:
             logger.warning("LLM judge detected poor quality or excessive fluff in transformation.")
             result = "> **Note:** This document may not be fully optimized for AI consumption.\n\n" + result

        return result

    def _critique_tool_schema(self, schema: str) -> str:
        prompt = f"""You are a strict reviewer evaluating a JSON schema for LLM interpretability.

Critique the following schema based on:
* Ambiguity in property meanings
* Missing descriptions
* Weak or missing behavioral constraints
* Lack of examples
* Any place where an LLM could misinterpret intent

Schema:
{schema}

Be harsh and specific. Suggest exact fixes. Do not rewrite the schema, just provide the critique.
"""
        try:
            logger.info("Calling Groq API for schema critique")
            response = self.client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model="llama-3.1-8b-instant",  # Faster model for critique
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            logger.warning(f"Quality verification LLM failed during critique: {e}")
            return "Critique failed, assume schema is valid."

    def optimize_tool(self, input_text: str) -> dict:
        if not self.client:
            raise ValueError("Groq client not configured")

        # Phase 1: Generation
        generator_prompt = f"""
        You are an expert in JSON Schema design and LLM interpretability.
        Your task is to analyze user input to generate a tool schema that is optimized for AI understanding, reasoning, and generation.
        Assume the schema will be used by an LLM with no prior context. It must be self-explanatory.
        
        Input Text: {input_text}
        
        Focus on the following improvements:
        1. Semantic Enrichment: Add a clear, precise "description" to EVERY property. Describe behavior, not just structure.
        2. Behavioral Constraints: Add constraints such as enums, default values, required fields, min/max limits.
        3. Example Grounding: Add multiple realistic examples at both object level and schema level.
        4. AI Interpretability Optimization: Prefer explicitness over brevity.
        
        Output a JSON object with strictly these keys:
        - "optimized_description": A clear, concise description of the tool inferred from the input text.
        - "tool_schema": A JSON string representing a schema for this tool (e.g. OpenAPI or generic JSON schema).
        - "suggestions": A JSON string array of suggestions for improvements or edge cases to consider. Each suggestion MUST be a single, simple sentence. Do NOT use CSV, markdown, line breaks, or tables inside the strings.
        
        Do not wrap your output in markdown code blocks, just return raw JSON.
        """
        
        logger.info("Calling Groq API for initial tool generation (Phase 1)")
        response = self.client.chat.completions.create(
            messages=[{"role": "user", "content": generator_prompt}],
            model=self.model,
        )
        text = response.choices[0].message.content.strip()
        
        if text.startswith("```json"): text = text[7:]
        if text.startswith("```"): text = text[3:]
        if text.endswith("```"): text = text[:-3]
            
        try:
            initial_result = json.loads(text.strip())
        except json.JSONDecodeError:
            raise ValueError("LLM returned malformed JSON during Phase 1")

        # Phase 2: Critique
        schema_to_critique = initial_result.get("tool_schema", "{}")
        critique = self._critique_tool_schema(schema_to_critique)
        
        if "Critique failed" in critique:
            return initial_result

        # Phase 3: Refinement
        refiner_prompt = f"""
        You are an expert in JSON Schema design and LLM interpretability.
        You previously generated a tool schema based on the following input:
        {input_text[:500]}... [truncated]
        
        Here is your initial JSON generation:
        {json.dumps(initial_result, indent=2)}
        
        A strict reviewer provided the following critique of your schema:
        {critique}
        
        Your task is to refine and update the JSON generation based on the reviewer's feedback.
        Improve the "tool_schema" property. You may also add the reviewer's findings into the "suggestions" array if they relate to future improvements.
        
        Output a JSON object with strictly these keys:
        - "optimized_description": A clear, concise description of the tool inferred from the input text.
        - "tool_schema": A JSON string representing a schema for this tool.
        - "suggestions": A JSON string array of suggestions. Each suggestion MUST be a single, simple sentence. Do NOT use CSV, markdown, line breaks, or tables inside the strings.
        
        Do not wrap your output in markdown code blocks, just return raw JSON.
        """
        
        logger.info("Calling Groq API for tool refinement (Phase 3)")
        refine_response = self.client.chat.completions.create(
            messages=[{"role": "user", "content": refiner_prompt}],
            model=self.model,
        )
        refined_text = refine_response.choices[0].message.content.strip()
        
        if refined_text.startswith("```json"): refined_text = refined_text[7:]
        if refined_text.startswith("```"): refined_text = refined_text[3:]
        if refined_text.endswith("```"): refined_text = refined_text[:-3]
            
        try:
            return json.loads(refined_text.strip())
        except json.JSONDecodeError:
            logger.warning("LLM returned malformed JSON during Phase 3, falling back to Phase 1 result")
            return initial_result
