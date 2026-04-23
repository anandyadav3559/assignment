import logging
from flask import Blueprint, jsonify, request
from services import GroqService
from extensions import db
from models import TransformationLog, AnalysisLog, ToolAnalysis
import json

logger = logging.getLogger(__name__)
api_bp = Blueprint('api', __name__, url_prefix='/api')
groq_service = GroqService()

@api_bp.route('/optimize_tool', methods=['POST'])
def optimize_tool():
    data = request.get_json()
    if not data or 'input_text' not in data:
        return jsonify({"error": "Missing input_text"}), 400
        
    try:
        result = groq_service.optimize_tool(data['input_text'])
        
        tool_schema = result.get('tool_schema')
        if isinstance(tool_schema, (dict, list)):
            tool_schema = json.dumps(tool_schema)
            
        suggestions = result.get('suggestions')
        if isinstance(suggestions, (dict, list)):
            suggestions = json.dumps(suggestions)
            
        tool_analysis = ToolAnalysis(
            input_text=data['input_text'],
            optimized_description=result.get('optimized_description'),
            tool_schema=tool_schema,
            suggestions=suggestions
        )
        db.session.add(tool_analysis)
        db.session.commit()
        
        return jsonify(result)
    except Exception as e:
        logger.error(f"Error in optimize_tool: {e}", exc_info=True)
        return jsonify({"error": str(e)}), 500

@api_bp.route('/history', methods=['GET'])
def get_history():
    analyses = ToolAnalysis.query.order_by(ToolAnalysis.created_at.desc()).all()
    results = []
    for a in analyses:
        tool_schema = a.tool_schema
        if tool_schema:
            try:
                tool_schema = json.loads(tool_schema)
            except Exception:
                pass
                
        suggestions = a.suggestions
        if suggestions:
            try:
                suggestions = json.loads(suggestions)
            except Exception:
                pass
                
        results.append({
            "id": a.id,
            "input_text": a.input_text,
            "optimized_description": a.optimized_description,
            "tool_schema": tool_schema,
            "suggestions": suggestions,
            "created_at": a.created_at.isoformat() if a.created_at else None
        })
    return jsonify(results)

@api_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "message": "Backend is running!"})

@api_bp.route('/analyze', methods=['POST'])
def analyze_url():
    data = request.get_json()
    if not data or 'url' not in data:
        logger.warning("Missing URL in request")
        return jsonify({"error": "Missing URL"}), 400
    
    url = data['url']
    
    try:
        result = groq_service.analyze_url(url)
        
        # Log to database
        log = AnalysisLog(url=url, score=result.get("score", 0), success=True)
        db.session.add(log)
        db.session.commit()
        
        return jsonify({
            "score": result.get("score", 0),
            "feedback": result.get("feedback", "No feedback provided.")
        })
        
    except Exception as e:
        logger.error(f"Error during analysis: {e}", exc_info=True)
        log = AnalysisLog(url=url, success=False)
        db.session.add(log)
        db.session.commit()
        return jsonify({"error": "Internal server error during analysis"}), 500

@api_bp.route('/transform', methods=['POST'])
def transform_doc():
    if 'file' not in request.files:
        logger.warning("No file part in request")
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        logger.warning("No selected file")
        return jsonify({"error": "No selected file"}), 400
        
    if not (file.filename.lower().endswith('.md') or file.filename.lower().endswith('.txt')):
        logger.warning(f"Invalid file type: {file.filename}")
        return jsonify({"error": "Only .md and .txt files are supported"}), 400
        
    try:
        # Extract text from MD/TXT
        text_content = file.read().decode('utf-8')
        original_size = len(text_content)
            
        if not text_content.strip():
            logger.warning("Empty file content")
            return jsonify({"error": "Could not extract text from file"}), 400

        markdown = groq_service.transform_document(text_content)
        
        # Log to database
        log = TransformationLog(
            filename=file.filename,
            original_size=original_size,
            success=True
        )
        db.session.add(log)
        db.session.commit()
        
        return jsonify({
            "markdown": markdown
        })
        
    except Exception as e:
        logger.error(f"Error during transformation: {e}", exc_info=True)
        log = TransformationLog(
            filename=file.filename,
            original_size=0,
            success=False,
            error_message=str(e)
        )
        db.session.add(log)
        db.session.commit()
        return jsonify({"error": "Internal server error during transformation"}), 500
