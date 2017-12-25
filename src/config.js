import axios from 'axios';
import {Toast} from 'antd-mobile';

// 拦截请求
axios.interceptors.request.use(function (config) {

    const token = sessionStorage.getItem("TOKEN");
    if (token) {
        config.headers = {'TOKEN': token};
    }

    Toast.loading('加载中', 0);
    return config;
});

// 拦截响应
axios.interceptors.response.use(function (config) {
    Toast.hide();
    return config;
});
