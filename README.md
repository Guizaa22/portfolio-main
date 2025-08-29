# Next.js Auto-Restart Development Server

Automatically restart your Next.js development server when builds are triggered. Eliminates the need for manual server restarts during development workflows.

## Installation

### NPX (Recommended)
```bash
cd your-nextjs-project
npx next-auto-restart
```

### Manual Setup
1. Copy `smart-dev-template.sh` to your project root as `smart-dev.sh`
2. Make it executable: `chmod +x smart-dev.sh`
3. Update your `package.json` scripts:

```json
{
  "scripts": {
    "build": "next build && touch /tmp/$(basename $PWD)-build-signal",
    "dev-smart": "./smart-dev.sh"
  }
}
```

## Usage

```bash
npm run dev-smart    # Terminal 1
npm run build        # Terminal 2 - triggers restart
```

## How It Works

Uses file-based inter-process communication:
1. Build script creates a signal file in `/tmp/`
2. Development script monitors for the signal
3. On detection: terminates current server, starts fresh instance
4. Signal file removed, monitoring continues

## Requirements

- Next.js project
- Unix-like environment (macOS, Linux, WSL)
- Bash shell

## Files

- `smart-dev-template.sh` - Core development server script
- `SETUP-INSTRUCTIONS.md` - Detailed setup guide
- `install-auto-restart.js` - NPX installer script

## License

MIT
