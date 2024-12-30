const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/0001-\d{2}$/;

export function isValidCNPJ(cnpj: string): boolean {
  return cnpjRegex.test(cnpj);
}