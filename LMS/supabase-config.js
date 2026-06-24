// Shared Supabase config — used by lms-login.html and student-dashboard.html
const SUPABASE_URL = 'https://frbepxvhetqykrzrjswx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Hvbn4fN0JZ6sVR0FaJ8wpQ_Mk1PLcJ-';

// Custom storage: if "Remember me" was checked at login, session persists in
// localStorage (survives browser close/reopen). If unchecked, session lives
// in sessionStorage only (cleared when the tab/browser is closed).
const REMEMBER_FLAG = 'lms_remember_me';

const lmsStorage = {
    getItem: (key) => localStorage.getItem(key) || sessionStorage.getItem(key),
    setItem: (key, value) => {
        const remember = localStorage.getItem(REMEMBER_FLAG) === 'true';
        if (remember) {
            localStorage.setItem(key, value);
        } else {
            sessionStorage.setItem(key, value);
        }
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
    }
};

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: lmsStorage,
        persistSession: true,
        autoRefreshToken: true
    }
});