import { chain, upperCase } from "lodash-es";

/**
 * A utility function that returns the acronym of a string.
 * @param name 
 * @returns string
 * @example
 * getAcronym('Nguyễn Văn A') // NA
 * getAcronym('anv@gmail.com') // AN
 */

export function getAcronym(name?: string): string {
  if (!name) return ''
  if (name.indexOf(' ') === -1) return upperCase(name.slice(0, 2))
  return chain(name)
    .split(' ')
    .map((n) => n.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpper()
    .value();
}

/**
 * A utility function that normalizes Vietnamese text.
 * @param text - The text to normalize.
 * @returns string
 * @example 
 * normalizeVietnamese('Nguyễn Văn A') // nguyen van a
 */

export function normalizeVietnamese(text: string) {
  return chain(text)
    .toLower()
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '')
    .replace(/\u02C6|\u0306|\u031B/g, '')
    .value();
}