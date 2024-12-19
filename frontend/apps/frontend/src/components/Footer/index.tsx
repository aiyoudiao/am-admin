/*
 * @Description: 公共页脚版权信息
 */

import { DefaultFooter } from '@ant-design/pro-components';
import { Icon } from '@umijs/max';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{ background: 'none' }}
      copyright={`${currentYear} 蚂蚁金服体验技术部出品`}
      links={[
        {
          key: '蚂蚁金服',
          title: '蚂蚁金服',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <Icon
              icon="ri:github-fill"
              style={{ display: 'inline-block', fontSize: 16, verticalAlign: 'middle' }}
            />
          ),
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://procomponents.ant.design/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
