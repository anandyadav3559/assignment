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
        
        return response.choices[0].message.content.strip()

    def optimize_tool(self, input_text: str) -> dict:
        if not self.client:
            raise ValueError("Groq client not configured")

        prompt = f"""
        You are an AI tasked with analyzing user input to generate a tool schema.
        Input Text: {input_text}
        
        Output a JSON object with strictly these keys:
        - "optimized_description": A clear, concise description of the tool inferred from the input text.
        - "tool_schema": A JSON string representing a schema for this tool (e.g. OpenAPI or generic JSON schema).
        - "suggestions": A JSON string array of suggestions for improvements or edge cases to consider.
        
        Do not wrap your output in markdown code blocks, just return raw JSON.
        """
        
        logger.info("Calling Groq API for tool optimization")
        response = self.client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=self.model,
        )
        text = response.choices[0].message.content.strip()
        
        if text.startswith("```json"): text = text[7:]
        if text.startswith("```"): text = text[3:]
        if text.endswith("```"): text = text[:-3]
            
        try:
            return json.loads(text.strip())
        except json.JSONDecodeError:
            raise ValueError("LLM returned malformed JSON")
