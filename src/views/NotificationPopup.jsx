// src/components/NotificationPopup.jsx
export default function NotificationPopup({ title, message, onConfirm, onCancel }) {
    // const [showNotification, setShowNotification] = useState(false);
    // const handleNotificationConfirm = () => {
    //     console.log("ตกลง");
    //     setShowNotification(false);
    //     navigate("/login");
    // };

    // const handleNotificationCancel = () => {
    //     console.log("ยกเลิก");
    //     setShowNotification(false);
    // };
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: 30,
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    minWidth: 300,
                    textAlign: 'center',
                    position: 'relative'
                }}
            >
                <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)' }}>
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="red"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M1 21h22L12 2 1 21z" />
                        <text
                            x="12"
                            y="16"
                            textAnchor="middle"
                            fill="white"
                            fontSize="14"
                            fontWeight="bold"
                            fontFamily="Arial"
                        >
                            !
                        </text>
                    </svg>
                </div>

                <h3 style={{ marginTop: 30, marginBottom: 10 }}>{title}</h3>
                <p>{message}</p>

                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-around' }}>
                    <button
                        onClick={onConfirm}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: 6,
                            cursor: 'pointer'
                        }}
                    >
                        เข้าสู่ระบบ
                    </button>
                    <button
                        onClick={onCancel}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: 6,
                            cursor: 'pointer'
                        }}
                    >
                        ยกเลิก
                    </button>
                </div>
            </div>
        </div>
    );
}