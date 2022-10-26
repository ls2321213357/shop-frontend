import Mock from 'mockjs';
import banner from '../mock/banner.json';
Mock.mock('/mock/banner', { code: 200, data: banner });
