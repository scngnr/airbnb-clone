import fs from 'fs';
import path from 'path';

const LOG_FILE = path.join(process.cwd(), 'logs', 'auth.log');

type LogLevel = 'info' | 'warning' | 'error';

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    details?: any;
}

export const ensureLogDirectory = () => {
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
};

export const logAuth = (level: LogLevel, message: string, details?: any) => {
    ensureLogDirectory();

    const logEntry: LogEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        details
    };

    const logLine = JSON.stringify(logEntry) + '\n';

    try {
        fs.appendFileSync(LOG_FILE, logLine);
    } catch (error) {
        console.error('Loglama hatası:', error);
    }
};

export const getAuthLogs = (limit: number = 100): LogEntry[] => {
    ensureLogDirectory();

    try {
        if (!fs.existsSync(LOG_FILE)) {
            return [];
        }

        const logs = fs.readFileSync(LOG_FILE, 'utf-8')
            .split('\n')
            .filter(Boolean)
            .map(line => JSON.parse(line));

        return logs.slice(-limit);
    } catch (error) {
        console.error('Log okuma hatası:', error);
        return [];
    }
};