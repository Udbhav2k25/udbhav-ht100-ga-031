from flask import Flask, request, jsonify
from services.story_weaver import weave_narrative, analyze_image_content # <--- IMPORT IT
from models import db, Story, StoryPage # Assuming you set up models

app = Flask(__name__)

@app.route('/api/generate-story', methods=['POST'])
def generate_story_endpoint():
    data = request.json
    user_id = data.get('user_id')
    images_input = data.get('images') # List of base64 or URLs + Context
    
    # 1. Process Images through Vision Model
    processed_images = []
    for img in images_input:
        # Get description from BLIP-2 (via your service function)
        desc = analyze_image_content(img['url']) 
        
        processed_images.append({
            'id': img['id'],
            'desc': desc,
            'context': img.get('user_context', '') # The "Mahishmati" note
        })
    
    # 2. Fetch User Profile (from Neon DB)
    # user = User.query.get(user_id)
    user_profile = {'name': 'John', 'age': 25} # Mock for now
    
    # 3. CALL THE WEAVER FUNCTION
    try:
        story_json = weave_narrative(processed_images, user_profile)
        
        # 4. Save to Database (Neon) here
        # ...
        
        return jsonify({"status": "success", "story": story_json})
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)