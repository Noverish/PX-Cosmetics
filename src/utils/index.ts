export function getLinkName(link?: string): string | undefined {
  if (!link) {
    return undefined;
  }

  if (link.includes('coupang')) {
    return '쿠팡';
  } if (link.includes('auction')) {
    return '옥션';
  } if (link.includes('gmarket')) {
    return '지마켓';
  }
  return undefined;
}

export function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
