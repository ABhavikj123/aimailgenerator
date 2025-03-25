# AI Mail Generator

A powerful Next.js application that generates professional emails and messages using AI. Perfect for creating cold emails, cold messages, and cover letters with ease.

## Features

- 🤖 AI-powered message generation
- 📝 Support for multiple message types:
  - Cold Emails
  - Cold Messages
  - Cover Letters
- ✏️ Direct message editing
- 📋 One-click copy to clipboard
- 🎨 Modern, responsive UI
- 🔒 Rate limiting for API usage
- 📱 Mobile-friendly design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **UI Components**: Shadcn/ui
- **AI Service**: Cohere AI
- **Rate Limiting**: Custom implementation
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Cohere AI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-mail-generator.git
cd ai-mail-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Cohere API key:
```env
COHERE_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Navigate to the main page
2. Select the type of message you want to generate
3. Enter the job description and any additional information
4. Click "Generate Message"
5. Review the generated message
6. Edit the message if needed
7. Copy the final message to your clipboard

## API Rate Limits

- Free tier: 5 million tokens per month
- Rate limiting: 2 requests per user per day
- Character limits:
  - Job Description: 500 characters
  - Additional Info: 500 characters
  - Improvement requests: 100 characters

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Cohere AI](https://cohere.ai/) for providing the AI service
- [Next.js](https://nextjs.org/) for the amazing framework
- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for the styling system

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.

---


