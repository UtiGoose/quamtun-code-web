import service from "../request";


// 注册
export function register(data) {
    return service({
		url: '/user/register',
		method: 'post',
        data: data
	})
}

// 登录
export function login(data) {
    return service({
		url: '/user/login',
		method: 'post',
        data: data
	})
}

// 登出
export function logout(data) {
    return service({
		url: '/user/logout',
		method: 'post',
        data: data
	})
}

// 根据token获取登录状态
export function loginByToken(data) {
    return service({
		url: '/user/loginByToken',
		method: 'post',
        data: data
	})
}

// 根据token获取用户信息
export function getUserInfo(data) {
    return service({
		url: '/user/getUserInfo',
		method: 'post',
        data: data
	})
}
