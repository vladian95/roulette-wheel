import React, { useState } from 'react';
import axios from 'axios';

const Form = ({ selectedPrize }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const TOKEN = '6061856841:AAF4o0WXDcFWUc3J9b3Cybs4-X8UMBC6E8E';
    const CHAT_ID = '-1001546830288';
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    let message = `<b>Запись клиента</b>\n`;
    message += `Имя: ${name}\n`;
    message += `Email: ${email}\n`;
    message += `Выбранный приз: ${selectedPrize}\n`;

    try {
      const response = await axios.post(URL_API, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      });

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Имя</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label htmlFor="prize">Ваш приз</label>
        <RoulettePrizeInput value={selectedPrize} onChange={() => {}} />
      </div>
      <button type="submit">Отправить</button>
      {success && <p>Сообщение успешно отправлено!</p>}
    </form>
  );
};

const RoulettePrizeInput = ({ value }) => {
  return <input type="text" value={value} readOnly />;
};

export default Form;
