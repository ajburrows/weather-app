export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#00274D', color: 'white', padding: '20px', textAlign: 'center' }}>
            <div style={{ marginBottom: '10px' }}>
                <p>&copy; 2024 Weather App</p>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <p>Sources:</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li>
                        Weather data provided by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#00aaff', textDecoration: 'none' }}>OpenMeteo</a>
                    </li>
                    <li>
                        Zip code data provided by <a href="https://simplemaps.com/data/us-zips" target="_blank" rel="noopener noreferrer" style={{ color: '#00aaff', textDecoration: 'none' }}>SimpleMaps</a>
                    </li>
                    <li>
                        Check out the code on <a href="https://github.com/ajburrows/weather-app" target="_blank" rel="noopener noreferrer" style={{ color: '#00aaff', textDecoration: 'none' }}>GitHub</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};