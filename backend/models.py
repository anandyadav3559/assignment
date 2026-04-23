from extensions import db
from datetime import datetime, timezone

class TransformationLog(db.Model):
    __tablename__ = 'transformation_logs'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    original_size = db.Column(db.Integer, nullable=False)
    success = db.Column(db.Boolean, default=True)
    error_message = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

class AnalysisLog(db.Model):
    __tablename__ = 'analysis_logs'
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(512), nullable=False)
    score = db.Column(db.Integer, nullable=True)
    success = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

import uuid

class ToolAnalysis(db.Model):
    __tablename__ = 'analyses'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    input_text = db.Column(db.Text, nullable=False)
    optimized_description = db.Column(db.Text, nullable=True)
    tool_schema = db.Column(db.Text, nullable=True) # JSON string
    suggestions = db.Column(db.Text, nullable=True) # JSON string
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
