import request from "@/utils/request";

const AUTH_BASE_URL = "/api/v1/auth";
import md5 from "md5";
const AuthAPI = {
  /** 登录接口*/
  login(data: LoginFormData) {
    /*  */
    const formData = new FormData();
    for (const key in data) {
      if (key === "password") {
        formData.append(key, md5(data[key]))
      }else {
        formData.append(key, data[key])
      }
    };
    return request<any, LoginResult>({
      url: `corrugated-carton-platform-user/oauth/token`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /** 刷新 token 接口*/
  refreshToken(refreshToken: string) {
    return request<any, LoginResult>({
      url: `${AUTH_BASE_URL}/refresh-token`,
      method: "post",
      params: { refreshToken: refreshToken },
      headers: {
        Authorization: "no-auth",
      },
    });
  },

  /** 注销登录接口 */
  logout() {
    return request({
      url: `${AUTH_BASE_URL}/logout`,
      method: "delete",
    });
  },

  /** 获取验证码接口*/
  getCaptcha() {
    return request<any, CaptchaInfo>({
      url: `${AUTH_BASE_URL}/captcha`,
      method: "get",
    });
  },
};

export default AuthAPI;

/** 登录表单数据 */
export interface LoginFormData {
  [key: string]: any;
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 验证码缓存key */
  captchaKey?: string;
  /** 验证码 */
  captchaCode?: string;
  // 默认参数
  grant_type: string;
  client_id: string;
  client_secret: string;
}

/** 登录响应 */
export interface LoginResult {
  /** 访问令牌 */
  access_token: string;
  /** 刷新令牌 */
  refreshToken?: string;
  /** 令牌类型 */
  token_type: string;
  /** 过期时间(秒) */
  expires_in: number;
}

/** 验证码信息 */
export interface CaptchaInfo {
  /** 验证码缓存key */
  captchaKey: string;
  /** 验证码图片Base64字符串 */
  captchaBase64: string;
}
