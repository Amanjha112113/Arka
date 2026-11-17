"""
ARKA LangGraph Multi-Agent Intent Router
Author: Aman Jha (amanjha112113)
Demonstrates typed edge dispatch:
Query -> Arka:router (1.5B, <120ms) -> Typed Edge -> [:coder | :agent | :reasoner]
"""

import json
from typing import TypedDict, Literal
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"
)

class RouterOutput(TypedDict):
    intent: Literal["code", "math", "search", "chat"]
    target_tag: Literal["coder", "reasoner", "agent"]
    confidence: float
    reasoning: str

def route_query(user_prompt: str) -> RouterOutput:
    """Classify user intent in <120ms using Arka:router."""
    resp = client.chat.completions.create(
        model="amanjha112113/Arka:router",
        messages=[{"role": "user", "content": user_prompt}],
        temperature=0.0
    )
    raw = resp.choices[0].message.content.strip()
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        # Fallback to coder if malformed
        return {
            "intent": "code",
            "target_tag": "coder",
            "confidence": 0.5,
            "reasoning": "Fallback to coder specialist"
        }

def dispatch_worker(target_tag: str, user_prompt: str) -> str:
    """Execute query with the specialized ARKA tier."""
    model_map = {
        "coder": "amanjha112113/Arka:coder",
        "agent": "amanjha112113/Arka:agent",
        "reasoner": "amanjha112113/Arka:reasoner"
    }
    model = model_map.get(target_tag, "amanjha112113/Arka:coder")
    
    resp = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": user_prompt}]
    )
    return resp.choices[0].message.content

if __name__ == "__main__":
    test_queries = [
        "Write a concurrent skip list in C++17.",
        "Prove that sqrt(3) is irrational.",
        "List all active Docker containers and check CPU usage."
    ]
    for q in test_queries:
        decision = route_query(q)
        print(f"\nQuery: {q}")
        print(f"-> Decision: {decision['target_tag']} ({decision['confidence']*100:.1f}%) | {decision['reasoning']}")
