import React from 'react';
import './index.css';

function App() {
    return (
        <div className="app">
            <header className="flex-col md:flex-row justify-between items-center p-4 md:p-8">
                <h1 className="text-2xl md:text-4xl">Studious Chainsaw</h1>
                <nav className="flex space-x-4 md:space-x-8">
                    <a href="#games" className="text-lg md:text-xl">Games</a>
                    <a href="#about" className="text-lg md:text-xl">About</a>
                </nav>
            </header>
            <main className="flex-col md:flex-row gap-4 md:gap-8" style={{ padding: '20px' }}>
                <div className="game-arena flex-col md:flex-row gap-4 md:gap-8">
                    {/* Game elements here */}
                </div>
            </main>
            <footer className="flex justify-center mt-4">
                <button className="px-4 md:px-32 py-2 text-lg md:text-xl hover:bg-blue-700 transition duration-200">
                    Start Game
                </button>
            </footer>
        </div>
    );
}

export default App;
