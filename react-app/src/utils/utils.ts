export type URLParam = {
  nab: string,
  oTab: string,
  oType: string,
  oId: string | null
}

export function classNames(...classes): string {
  return classes.filter(Boolean).join(' ')
}

export function getURLParam(hashURL: string): URLParam {
  hashURL = hashURL.replaceAll("#", "");
  var params: string[] = []
  
  if(hashURL.length > 0) params = hashURL.split("/");

  let urlParam: URLParam = {
    nab: params[0] === undefined ? "0" : params[0],
    oTab: params[1] === undefined ? "0" : params[1],
    oType: params[2] === undefined ? "Account" : params[2],
    oId: params[3] === undefined ? null : params[3]
  }
  
  return urlParam;
}