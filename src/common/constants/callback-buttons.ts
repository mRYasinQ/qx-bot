const CALLBACK_BUTTONS = Object.freeze({
  USERS_PREFIX: 'users:',
  USER_PREFIX: 'user:',
  USERS: { text: '👤 شناسه‌کاربر', callback_data: 'default' },
  SEARCH_USERS_ID: { text: '🔍 جستجو با شناسه‌حساب', callback_data: 'search_user_id' },
  SEARCH_TG_ID: { text: '🔍 جستجو با شناسه‌عددی', callback_data: 'search_tg_id' },
  USER_DETAIL: (userId: number) => ({
    text: `🏷 کاربر-${userId}`,
    callback_data: `user:${userId}`,
  }),

  EMPTY: { text: '📭 دیتایی وجود ندارد', callback_data: 'default' },
  EXIT: { text: '🚫 خروج', callback_data: 'exit' },
});

export default CALLBACK_BUTTONS;
