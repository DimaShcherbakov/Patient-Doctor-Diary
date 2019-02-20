import IMask from 'imask';

export function telMask(id) {
  const el = document.getElementById(id);
  const maskOptions = {
    mask: '+{375} (00) 000-00-00',
    lazy: false,
  };
  const mask = new IMask(el, maskOptions);
  mask.updateValue();
}

export function dateMask(id) {
  const el = document.getElementById(id);
  const maskOptions = {
    mask: Date,
    min: new Date(1900, 0, 1),
    max: new Date(3000, 0, 1),
    lazy: false,
  };
  const mask = new IMask(el, maskOptions);
  mask.updateValue();
}
