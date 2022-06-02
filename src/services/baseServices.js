import Axios from "axios";
import {
  DOMAIN,
  KEY,
  METHOD,
  TOKEN,
} from "../util/constants/settingSystemConstants";

export class baseServices {
  put = (url, model) => {
    return Axios({
      url: DOMAIN.CBB + url,
      method: METHOD.PUT,
      data: model,
      headers: {
        Authorization: KEY.CBB + localStorage.getItem(TOKEN.CBB),
      },
    });
  };

  post = (url, model) => {
    return Axios({
      url: DOMAIN.CBB + url,
      method: METHOD.POST,
      data: model,
      headers: {
        Authorization: KEY.CBB + localStorage.getItem(TOKEN.CBB),
      },
    });
  };

  get = (url) => {
    return Axios({
      url: DOMAIN.CBB + url,
      method: METHOD.GET,
      headers: {
        Authorization: KEY.CBB + localStorage.getItem(TOKEN.CBB),
      },
    });
  };

  delete = (url) => {
    return Axios({
      url: DOMAIN.CBB + url,
      method: METHOD.DELETE,
      headers: {
        Authorization: KEY.CBB + localStorage.getItem(TOKEN.CBB),
      },
    });
  };
}
