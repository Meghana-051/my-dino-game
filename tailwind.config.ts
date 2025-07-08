import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Game-specific colors
				game: {
					sky: {
						start: 'hsl(var(--game-sky-start))',
						end: 'hsl(var(--game-sky-end))'
					},
					ground: 'hsl(var(--game-ground))',
					player: 'hsl(var(--game-player))',
					obstacle: 'hsl(var(--game-obstacle))',
					cloud: 'hsl(var(--game-cloud))',
					sun: 'hsl(var(--game-sun))'
				}
			},
			backgroundImage: {
				'gradient-sky': 'var(--gradient-sky)',
				'gradient-player': 'var(--gradient-player)',
				'gradient-obstacle': 'var(--gradient-obstacle)'
			},
			boxShadow: {
				'player': 'var(--shadow-player)',
				'obstacle': 'var(--shadow-obstacle)',
				'ground': 'var(--shadow-ground)'
			},
			transitionTimingFunction: {
				'bounce': 'var(--transition-bounce)',
				'smooth': 'var(--transition-smooth)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'jump': {
					'0%': { transform: 'translateY(0) scale(1)' },
					'50%': { transform: 'translateY(-120px) scale(1.1)' },
					'100%': { transform: 'translateY(0) scale(1)' }
				},
				'float-cloud': {
					'0%': { transform: 'translateX(-100px)' },
					'100%': { transform: 'translateX(calc(100vw + 100px))' }
				},
				'move-obstacle': {
					'0%': { transform: 'translateX(100vw)' },
					'100%': { transform: 'translateX(-100px)' }
				},
				'bounce-score': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.2)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: 'var(--shadow-player)' },
					'50%': { boxShadow: '0 4px 30px hsl(var(--game-player) / 0.6)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'jump': 'jump 0.8s var(--transition-bounce)',
				'float-cloud': 'float-cloud 20s linear infinite',
				'move-obstacle': 'move-obstacle 3s linear infinite',
				'bounce-score': 'bounce-score 0.3s ease-in-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
