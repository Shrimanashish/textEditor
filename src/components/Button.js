const Button = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.3s ease', // Smooth hover effect
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.24)', // Adding box shadow
      }}

      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#0056b3'; // Darker blue on hover
        e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.45)'; // Increase shadow on hover
      }}

      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#007bff'; // Revert to original blue
        e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Revert shadow
      }}
    >
      {label}
    </button>
  );
};


export default Button;