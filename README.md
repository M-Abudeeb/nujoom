# Nujoom AI Soccer Analytics Platform ⚽🤖

## Overview

Nujoom is an AI-powered sports analytics platform designed to analyze football matches through computer vision and provide meaningful insights. The project consists of two main components:

- **Frontend**: A React-based dashboard that visually presents analytics such as player tracking, ball movement, radar views, and event summaries like goalkeeper saves.
- **Backend**: Python-based AI models using YOLOv8 and Ultralytics to perform detection and tracking of players, the ball, and special events (e.g., saves).

---

## Features

### 🔍 AI & CV Models

- **YOLOv8 Custom Models** trained for:
  - Player detection (classes: player, goalkeeper, referee, ball)
  - Ball detection (custom trained via Roboflow dataset)
- **Event Detection**:
  - Goalkeeper save detection based on ball speed, position, and proximity
  - Team classification
  - Radar rendering on pitch with tracking points

### 💻 Frontend (React)

- Built with TailwindCSS and Framer Motion
- Real-time dashboard view of detections
- Radar pitch visualization
- Upload video and receive processed visual analytics

---

## Technologies Used

### 🧠 Backend

- Ultralytics YOLOv8
- Python 3.11
- Supervision (for drawing and video processing)
- OpenCV
- Torch (CUDA for training)
- ByteTrack (for tracking)
- Roboflow for dataset management

### 🖼️ Frontend

- React + TailwindCSS
- Recharts (for graphs)
- Lucide React Icons
- Framer Motion (animations)
- Headless UI

---

## Getting Started

### 🚀 Backend (Training & Inference)

1. **Train Player Detection Model** using Ultralytics + Roboflow dataset
2. **Train Ball Detection Model** separately
3. **Run Analytics**:
   ```bash
   PYTHONPATH=. python examples/soccer/main.py \
     --source_video_path "input.mp4" \
     --target_video_path "output.mp4" \
     --device "cuda" \
     --mode SAVE_DETECTION
   ```

   > Modes supported: `PLAYER_DETECTION`, `BALL_DETECTION`, `PLAYER_TRACKING`, `TEAM_CLASSIFICATION`, `RADAR`, `SAVE_DETECTION`, `PITCH_DETECTION`

---

### 🌐 Frontend (Dashboard)

1. Navigate to the frontend folder:
   ```bash
   cd Nujoom12
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Example Use Case

- Upload match footage
- AI detects and tracks players, ball, and referees
- Highlights potential **goalkeeper saves**
- Shows positions on radar pitch
- Results displayed in frontend dashboard

---

## Notes

- Make sure to place trained models in the appropriate `data/` directory
- CUDA is recommended for smooth inference
- Fine-tuning ball detection is key for accurate event detection

---

## Acknowledgments

- [Ultralytics YOLOv8](https://github.com/ultralytics/ultralytics)
- [Roboflow](https://roboflow.com)
- [Supervision AI Toolkit](https://github.com/roboflow/supervision)