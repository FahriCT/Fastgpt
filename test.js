const axios = require('axios');
const readlineSync = require('readline-sync');

const fastGptApiKey = 'fastgpt-';
const fastGptApiUrl = 'https://api.fastgpt.in/api/';

async function askFastGPT(question) {
    const requestBody = {
        chatId: 'terminal_chat',
        stream: false,
        detail: false,
        messages: [
            {
                role: 'user',
                content: question,
            },
        ],
    };

    try {
        const response = await axios.post(fastGptApiUrl, requestBody, {
            headers: {
                Authorization: `Bearer ${fastGptApiKey}`,
                'Content-Type': 'application/json',
            },
        });

        const reply = response.data?.messages?.[0]?.content || 'Tidak ada jawaban.';
        return reply;
    } catch (error) {
        console.error('Error querying FastGPT:', error.message);
        return 'Terjadi kesalahan saat menghubungi FastGPT.';
    }
}

(async function main() {
    console.log('=== FastGPT Chatbot ===');
    console.log('Ketik "exit" untuk keluar.\n');

    while (true) {
        const question = readlineSync.question('Anda: ');

        if (question.toLowerCase() === 'exit') {
            console.log('Sampai jumpa!');
            break;
        }

        const reply = await askFastGPT(question);
        console.log(`FastGPT: ${reply}\n`);
    }
})();
