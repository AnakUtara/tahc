# TAHC – The Anonymous Human Chat

TAHC (The Anonymous Human Chat) is a real-time web chat application that allows users to connect and converse anonymously with anyone logged into the site. This project was built as a learning experience to understand and implement WebSockets for real-time communication, leveraging a modern full-stack development approach.

## 🚀 Live Demo

<video src="https://private-user-images.githubusercontent.com/141168468/465619006-4f5f6439-5b67-44a2-9b7a-0161b86f6907.mp4?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIzMzAwODcsIm5iZiI6MTc1MjMyOTc4NywicGF0aCI6Ii8xNDExNjg0NjgvNDY1NjE5MDA2LTRmNWY2NDM5LTViNjctNDRhMi05YjdhLTAxNjFiODZmNjkwNy5tcDQ_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNzEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDcxMlQxNDE2MjdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hNDExNzQwNDI0MTc1NzRjMGQ4OGY3NGQ3ZDA5ZmUzNzQzZTIwOTU0NTA1OTUxZGMxZDc0YTBhNWYyZGM4MDJlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.jyj1JN2WDpwZiLd2Xu1oYF5nY1f4tBYfdchCSqEjMrY" controls width="600">
  Your browser does not support the video tag.
</video>

_A demo video is also available in the repository’s [issues section](https://github.com/AnakUtara/tahc/issues/3) for a walkthrough of the app and its features._

## 🛠️ Tech Stack

- **Backend:** [Laravel 11](https://laravel.com/)  
- **Frontend:** [React](https://react.dev/) via [Inertia.js](https://inertiajs.com/)  
- **Authentication:** [Laravel Breeze Starter Kit](https://laravel.com/docs/11.x/starter-kits#breeze)  
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [Flowbite React](https://flowbite-react.com/)  
- **Real-Time Communication:** [Laravel Reverb](https://laravel.com/docs/11.x/broadcasting#reverb-server) (server), [Laravel Echo](https://laravel.com/docs/11.x/broadcasting#client-side-installation) (client)  
- **Job Queues & Analytics:** [Redis](https://redis.io/) for queueing, [Laravel Horizon](https://laravel.com/docs/11.x/horizon) for monitoring  

## ✨ Key Features & Learning Outcomes

### Real-Time Presence & Private Channels

- **User Presence:**  
  - Login and logout events are broadcast on a presence channel.
  - User data from the presence channel is streamed to React using Laravel Echo, allowing live updates of the user list.
- **Private Chat Channels:**  
  - Each chat session between two users occurs in a unique private channel, ensuring privacy and security.
  - Users are automatically subscribed to these channels upon initiating a chat.

### Optimistic UI & Live Notifications

- **Optimistic Updates:**  
  - Implemented optimistic UI—messages appear instantly in the chat before being confirmed by the server, creating a smooth user experience.
- **Live Toast Notifications:**  
  - Chat data sent through private channels triggers real-time toast notifications using React, enhancing interactivity.

### Typing Indicators

- **Laravel Echo’s Whisper:**  
  - Typing notifications are implemented using Echo’s whisper feature, allowing users to see when their chat partner is typing in real time.

### Modern Auth & Rapid Development

- **Breeze Starter Kit:**  
  - Accelerated the setup of authentication and user management.
  - Prebuilt React screens and server-side logic allowed more focus on real-time features.

### Queue Offloading & Analytics

- **Redis & Horizon:**  
  - Job queues, such as broadcasting or notifications, are offloaded to Redis for performance.
  - Horizon provides real-time analytics and monitoring of queue health and throughput.

## 🧠 What I Learned

Building TAHC gave me hands-on experience with:

- The fundamentals and advanced concepts of WebSockets in Laravel and React.
- The difference between presence and private channels, and how to manage user privacy in real-time apps.
- Handling optimistic updates and creating responsive user interfaces.
- Offloading heavy or asynchronous tasks to job queues and monitoring them with Horizon.
- Leveraging starter kits to save development time and focus on custom, real-time features.

## 📂 Quick Start

1. **Clone the repository:**  
   `git clone https://github.com/AnakUtara/tahc.git`
2. **Install dependencies:**  
   - Backend: `composer install`
   - Frontend: `npm install`
3. **Set up environment:**  
   - Copy `.env.example` to `.env` and configure your database, broadcasting, and Redis settings.
4. **Run migrations and seeders:**  
   `php artisan migrate --seed`
5. **Start the servers:**  
   - Backend: `php artisan serve`
   - Frontend: `npm run dev`
   - Laravel Reverb: `php artisan reverb:start`
   - (Optional) Horizon: `php artisan horizon`

## 🤝 Acknowledgments

- Inspired by the Laravel and React communities.
- Built to deepen understanding of real-time, full-stack web development.
