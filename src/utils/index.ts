export function getLinkName(link?: string): string | undefined {
  if (!link) {
    return undefined;
  }

  if (link.includes('coupang')) {
    return '쿠팡';
  } else if (link.includes('auction')) {
    return '옥션';
  } else if (link.includes('gmarket')) {
    return '지마켓';
  } else {
    return undefined;
  }
}

export function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}