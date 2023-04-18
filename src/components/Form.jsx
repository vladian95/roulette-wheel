import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const TOKEN = '6061856841:AAF4o0WXDcFWUc3J9b3Cybs4-X8UMBC6E8E';
    const CHAT_ID = '-1001546830288';
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    let message = `<b>Запись клиента</b>\n`;
    message += `<b>Отправитель:</b> ${name}\n`;
    message += `<b>Почта:</b> ${email}`;

    try {
      await axios.post(URL_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message,
      });
      setName('');
      setEmail('');
      setSuccess(true);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="эл. почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">отправить</button>
      </form>
      {success && <p>Сообщения успешно отправлено!</p>}
    </div>
  );
};

export default Form;
