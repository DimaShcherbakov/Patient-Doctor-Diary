export function openMenu (openMenu) {
  return {
    type: 'MENU_ACTION',
    payload: !openMenu,
  }
};
