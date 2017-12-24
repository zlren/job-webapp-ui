// 合并reducer，并且返回

// 这个是用来合并的工具
import {combineReducers} from 'redux';

// 具体的reducer，存到store里面的state里的时候，key和reducer的名字是相同的
import {user} from './redux/user.redux';
import {chat} from "./redux/chat.redux";

export default combineReducers({user, chat});
