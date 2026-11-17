"""
ARKA Python Client Example
Author: Aman Jha (amanjha112113)
Demonstrates deterministic local inference through the OpenAI-compatible endpoint (localhost:11434/v1).
"""

from openai import OpenAI

# Connect to local zero-telemetry Ollama instance
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"  # placeholder for local execution
)

def generate_cpp_code(prompt: str) -> str:
    response = client.chat.completions.create(
        model="amanjha112113/Arka:coder",
        messages=[
            {
                "role": "system",
                "content": "Principal C++17 systems architect. Zero filler. Mandatory Complexity & Edge Cases."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.1,
        max_tokens=2048
    )
    return response.choices[0].message.content

def reason_through_problem(prompt: str) -> str:
    response = client.chat.completions.create(
        model="amanjha112113/Arka:reasoner",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )
    return response.choices[0].message.content

if __name__ == "__main__":
    print("Generating C++17 thread-safe queue with Arka:coder...")
    code = generate_cpp_code("Implement a bounded thread-safe queue in C++17.")
    print(code)
