import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {Home} from "lucide-react"
import {NavLink} from "react-router-dom";

export default function NotFound() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)


    }, [])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-primary/5"
                        style={{
                            width: `${Math.random() * 200 + 50}px`,
                            height: `${Math.random() * 200 + 50}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 20 + 10}s`,
                            animationDelay: `${Math.random() * 2}s`,
                            animation: "float infinite ease-in-out alternate",
                        }}
                    />
                ))}
            </div>

            {/* Main content with parallax effect */}
            <div
                className="relative z-10 flex flex-col items-center text-center"
                style={{

                    transition: "transform 0.2s ease-out",
                }}
            >
                <h1
                    className={`text-9xl font-bold text-primary mb-4 transition-all duration-1000 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    404
                </h1>

                <h2
                    className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-1000 delay-300 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    Page Not Found
                </h2>

                <p
                    className={`text-muted-foreground max-w-md mb-8 transition-all duration-1000 delay-500 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    Oops! The page you're looking for seems to have wandered off into the digital wilderness.
                </p>

                <Button
                    asChild
                    size="lg"
                    className={`transition-all duration-1000 delay-700 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <NavLink to="/" className="gap-2">
                        <Home size={18} />
                        Back to Home
                    </NavLink>
                </Button>
            </div>

            {/* Animated shapes */}
            <div
                className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/50 to-transparent transition-all duration-1000 delay-1000 ${
                    isVisible ? "opacity-100" : "opacity-0"
                }`}
            />

            <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0.3;
          }
        }
      `}</style>
        </div>
    )
}

