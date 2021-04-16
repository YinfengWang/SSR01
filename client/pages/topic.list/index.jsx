import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer, Observer} from 'mobx-react';


const onChange = (e, appStore) => {
    appStore.changeName(e.target.value) ;
};
// 函数写法
const TopicList = ({appStore}) => (
    <div>
        {
            console.log(appStore)
        }
        <div>this is list </div>
        <input type='text' onChange={(e) => {onChange(e, appStore);}} />
        <div>{appStore.msg}</div>
    </div>
);
// 类的写法
// class TopicList extends React.Component {
//   onChange = (e) => {
//       this.props.appStore.changeName(e.target.value) ;
//   };
//   render () {
//       return (<>
//           <input type='text' onChange={this.onChange} />
//           <div>{this.props.appStore.msg}</div>
//       </>);
//   }
// }

TopicList.propTypes = {
    appStore: PropTypes.object.isRequired, // correct
};


const ObserveTopicList = inject('appStore')(
    observer(TopicList));


export default ObserveTopicList;