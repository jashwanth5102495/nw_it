import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setScrolled(scrollTop > 100);
        };

        // Update time every second
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(timeInterval);
        };
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const scrollToSection = (sectionId: string) => {
        document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className={`fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${scrolled ? 'top-2' : 'top-4'}`}>
            {/* Extended Dock Bar with Time/Date */}
            <nav className="flex items-center space-x-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 shadow-2xl transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-3xl">
                {/* Left - Date and Time */}
                <div className="flex items-center">
                    <div className="text-white/90 font-medium">
                        <div className="text-sm">{formatTime(currentTime)}</div>
                        <div className="text-xs text-white/70">{formatDate(currentTime)}</div>
                    </div>
                </div>

                {/* Separator */}
                <div className="w-px h-8 bg-white/20"></div>

                {/* Navigation Icons */}
                <div className="flex items-center space-x-3">
                    {/* Home */}
                    <button
                        onClick={() => navigate('/')}
                        className="nav-dock-item group relative"
                        title="Home"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="nav-tooltip">Home</span>
                    </button>

                    {/* About */}
                    <button
                        onClick={() => navigate('/about')}
                        className="nav-dock-item group relative"
                        title="About Us"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="nav-tooltip">About</span>
                    </button>

                    {/* Career */}
                    <button
                        onClick={() => navigate('/career')}
                        className="nav-dock-item group relative"
                        title="Career"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                        </svg>
                        <span className="nav-tooltip">Career</span>
                    </button>

                    {/* Contact */}
                    <button
                        onClick={() => navigate('/contact')}
                        className="nav-dock-item group relative"
                        title="Contact"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="nav-tooltip">Contact</span>
                    </button>

                    {/* Settings */}
                    <button
                        onClick={() => alert('Settings clicked!')}
                        className="nav-dock-item group relative"
                        title="Settings"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="nav-tooltip">Settings</span>
                    </button>
                </div>

                {/* Separator */}
                <div className="w-px h-8 bg-white/20"></div>

                {/* Right - Logo or Brand */}
                <div className="flex items-center">
                    <div className="text-white/90 font-bold text-sm">
                        .XYZ
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;