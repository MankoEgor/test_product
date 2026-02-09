import { useState } from "react";

function OrderForm(){
    const[userPhone, setUserPhone] = useState("");
    const[userName, setUserName] = useState("");
    const[userSurname, setUserSurname] = useState("");
    const[error, setError] = useState("");
    const[status, setStatus] = useState('idle');


    const ENDPOINT = import.meta.env.VITE_ORDER_ENDPOINT;
    
    console.log("ENDPOINT =", import.meta.env.VITE_ORDER_ENDPOINT);
    console.log("ENV =", import.meta.env);

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

            const body = new URLSearchParams({
                phone,
                name: userName,
                surname: userSurname,
                page: 'home'
            });


            const res = await fetch(ENDPOINT, {
                method: "POST",
                body,
            });

            const data = await res.json();

            if(!data.ok){
                setStatus('idle');
                setError(data.error || "Ошибка отправки");
                return;
            }
            setStatus('success');
            setUserPhone("");
            setUserName("")
            setUserSurname("")

        } catch(err) {
            setStatus('idle');
            setError("Сервер не доступен / ошибка сети");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="userName" 
                id="userName" 
                placeholder="Enter user name" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} />

            <input 
                type="text" 
                name="userSurname" 
                id="userSurname" 
                placeholder="Enter user surname" 
                value={userSurname} 
                onChange={(e) => setUserSurname(e.target.value)} />

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
            {status === 'success' && <p className="successOrder">Заявка успешно оправлена</p>}
        </form>
    );
}

export default OrderForm;
