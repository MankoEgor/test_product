import { useState } from "react";

function OrderForm(){
    const[userPhone, setUserPhone] = useState("");
    const[error, setError] = useState("");
    const[status, setStatus] = useState('idle')

    const ENDPOINT = import.meta.env.VITE_ORDER_ENDPOINT;

    async function handleSubmit(e){
        e.preventDefault();
        setError("");

        const phone = userPhone.trim();

        if(!phone){
            setError("Телефон не может быть пустым");
            return;
        }

        if(phone.startsWith("+375")){
            if(phone.length !== 13){
                setError("Некорректный номер телефона, длина должна достигать 12 символов");
                return;
            }
        }
        else if(phone.startsWith("80")){
            if(phone.length !== 11){
                setError("Некорректный номер телефона, длина должна достигать 11 символов");
                return;
            }
        }
        else{
            setError("Номер должен начинаться с +375 или 80");
            return;
        }

        try{
            setStatus('loading');

            if (!ENDPOINT) {
                setError("ENDPOINT не задан. Проверь .env и перезапусти npm run dev");
                return;
            }


            const res = await fetch(ENDPOINT, {
                method: "POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({
                    phone,
                    name: '',
                    surname: '',
                    page: 'home'
                })
            });

            const data = await res.json();

            if(!data.ok){
                setStatus('idle');
                setError(data.error || "Ошибка отправки");
                return;
            }

            setStatus('success');
            setUserPhone("");

        } catch(err) {
            setStatus('idle');
            setError("Сервер не доступен / ошибка сети");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="phoneNumber" 
                id="phoneNumber" 
                placeholder="Enter phone number" 
                value={userPhone} 
                onChange={(e) => {
                    setUserPhone(e.target.value)
                    setError("") 
                    }} />
            <button className="subOrder" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Отправка...' : 'Заказать звонок'}
            </button>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {status === 'success' && <p className="success">Запрос отправлен</p>}
        </form>
    );
}

export default OrderForm;
