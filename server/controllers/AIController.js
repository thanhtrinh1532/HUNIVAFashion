// // server/controllers/AIController.js
// const AIController = {
//   // Xử lý yêu cầu chat
//   handleChat: async (req, res) => {
//     try {
//       const { message } = req.body;
//       if (!message) {
//         return res.status(400).json({ error: 'Message is required' });
//       }
//       // Giả lập phản hồi AI (thay thế bằng logic AI thực tế, ví dụ: gọi API chatbot)
//       const response = `AI response to: ${message}`;
//       res.status(200).json({ response });
//     } catch (error) {
//       res.status(500).json({ error: 'Error processing chat', details: error.message });
//     }
//   },

//   // Gợi ý sản phẩm
//   getProductRecommendations: async (req, res) => {
//     try {
//       const { user_id } = req.body;
//       if (!user_id) {
//         return res.status(400).json({ error: 'User ID is required' });
//       }
//       // Giả lập gợi ý sản phẩm (thay thế bằng logic AI thực tế, ví dụ: dựa trên lịch sử mua hàng)
//       const recommendations = await Product.getAll(); // Ví dụ đơn giản: lấy tất cả sản phẩm
//       res.status(200).json(recommendations);
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching recommendations', details: error.message });
//     }
//   },
// };

// module.exports = AIController;

const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // đảm bảo đã có biến môi trường này
});

const chatWithAI = async (req, res) => {
  console.log('Request body:', req.body); // Thêm dòng này để debug
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }]
    });

    const reply = completion.choices[0].message.content.trim();
    res.json({ reply });
  } catch (error) {
    console.error('OpenAI Error:', error);

    if (error.status === 429) {
      return res.status(429).json({ error: 'Bạn đã vượt quá giới hạn sử dụng API. Vui lòng kiểm tra gói và thanh toán trên OpenAI.' });
    }

    return res.status(500).json({ error: 'Something went wrong with OpenAI' });
  }
};

module.exports = { chatWithAI };
