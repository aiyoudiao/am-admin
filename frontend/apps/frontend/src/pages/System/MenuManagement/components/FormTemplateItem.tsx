/*
 * @Description: 表单配置项
 */

import { ProFormDependency, ProFormRadio, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components';
import { getLocale, useIntl } from '@umijs/max';
import { useRequest } from 'ahooks'
import { Button, Divider, Form, Space, Tooltip, TreeSelect, Typography } from 'antd';
import { get, keys, upperFirst, camelCase, kebabCase, toString } from 'lodash-es';
import type { FC } from 'react';
import Icon, { AppstoreOutlined } from '@ant-design/icons'

import { ProFormParent, ProFormSort, ProFormStatus } from '@/components/CommonProForm'
import { IconPicker } from '@/components/Icon'
import { getInternationalList } from '@/services/system/internationalization'
import { findNodePath, formatPerfix } from '@/utils'
import { MenuTypeEnum } from '@/utils/const'
import { INTERNATION, MENU_TYPE, ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/system/menu-management';

import MenuFormRender from './MenuFormRender';

const { Title } = Typography;

const FormTemplateItem: FC<Pick<FormTemplateProps, 'treeData'>> = ({ treeData }) => {
  const { formatMessage } = useIntl();
  // 获取上下文表单实例
  const form = Form.useFormInstance()
  // 判断是否是添加子级，有 parent_id 并且其它字段没值
  const { parent_id, name } = form.getFieldsValue(true)
  /**
   * @description: 获取国际化列表
   */
  const { data: internationalData } = useRequest(
    async () => get(await getInternationalList({ isMenu: true }), 'data', []))


  console.log('internationalData', internationalData)

  // 是按钮就显示
  const isMenuRender = (
    <>
      {/* 组件路径 */}
      <ProFormText
        name="component"
        colProps={{ span: 12 }}
        label={formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'component') })}
        placeholder={
          formatMessage({ id: INTERNATION.PLACEHOLDER }) +
          formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'component') })
        }
        fieldProps={{ showCount: true, maxLength: 200 }}
      />
      {/* 重定向 */}
      <ProFormText
        name="redirect"
        colProps={{ span: 12 }}
        label={formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'redirect') })}
        placeholder={
          formatMessage({ id: INTERNATION.PLACEHOLDER }) +
          formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'redirect') })
        }
        fieldProps={{ showCount: true, maxLength: 100 }}
      />
    </>
  );
  // 不是按钮就隐藏这些选项
  const unButtonRender = (
    <>
      {/* 路由地址 */}
      <ProFormText
        name="path"
        colProps={{ span: 12 }}
        label={formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'path') })}
        placeholder={
          formatMessage({ id: INTERNATION.PLACEHOLDER }) +
          formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'path') })
        }
        fieldProps={{ showCount: true, maxLength: 100 }}
        rules={[{ required: true }]}
      />
      {/* 图标 */}
      <ProFormText
        name="icon"
        colProps={{ span: 12 }}
        label={formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'icon') })}
        placeholder={
          formatMessage({ id: INTERNATION.PLACEHOLDER }) +
          formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'icon') })
        }
        tooltip={formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'icon.tooltip') })}
        fieldProps={{
          showCount: true,
          maxLength: 80,
          addonBefore: (
            <IconPicker
              icon={form.getFieldValue('icon')}
              onChange={(value) => {
                form.setFieldValue('icon', value)
              }}
            >
             <AppstoreOutlined />
            </IconPicker>
          ),
        }}
      />
    </>
  );


  // 智能补全: 根据用户输入的内容，智能补全表单项的值
  const intelligentCompletion = () => {

    // 没有图标就默认选一个
    if (!form.getFieldValue('icon')) {
      form.setFieldsValue({
        icon: 'ant-design:bars-outlined'
      })
    }

    // 输入了路由地址，就自动填充组件路径、权限标识、图标
    const path = form.getFieldValue('path')

    if (!path) {
      return
    }

    const menuType = form.getFieldValue('menu_type');

    // 一级菜单级别，仅需根据路由地址填充权限标识
    if (menuType === MENU_TYPE.DIR) {
      form.setFieldsValue({
        permission: path
          .split('/')
          .filter(Boolean)
          .map((segment: string) => kebabCase(segment))
          .join(':')
      })
    }

    // 二级菜单级别，需要根据路由地址填充权限标识、组件路径
    if (menuType === MENU_TYPE.MENU) {
      form.setFieldsValue({
        component: './' + path
          .split('/')
          .filter(Boolean)
          .map((segment: string) => {
            console.log('segment', segment)
            console.log('camelCase(segment)', camelCase(segment))
            console.log('startCase(camelCase(segment))', upperFirst(camelCase(segment)))
            return upperFirst(camelCase(segment))
          })
          .join('/'),
        permission: path
          .split('/')
          .filter(Boolean)
          .map((segment: string) => kebabCase(segment))
          .join(':')
      })
    }
  }

  // 纠正数据：根据用户输入的内容，纠正表单项的值
  const correctData = () => {
    // 存在重定向，就清空组件路径、权限标识、图标
    if (form.getFieldValue('redirect')) {
      form.setFieldsValue({
        component: '',
        permission: '',
        icon: '',
      })
    }
  }

  return (
    <>
      {/* 菜单类型 */}
      <ProFormRadio.Group
        name="menu_type"
        colProps={{ span: 10 }}
        label={formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'menu_type') })}
        radioType="button"
        initialValue={MENU_TYPE.DIR}
        fieldProps={{
          buttonStyle: 'solid',
        }}
        options={keys(MenuTypeEnum).map((type: string) => ({
          value: type,
          label: formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, `menu_type.${type}`) }),
        }))}
      />
      {/* 父级 */}
      <ProFormParent
        colProps={{ span: 14 }}
        fieldProps={{
          treeData,
          disabled: parent_id && !name,
          treeNodeFilterProp: getLocale(),
          fieldNames: {
            label: getLocale(),
            value: 'menu_id',
          },
        }}
      />
      <Divider orientation="left" style={{ marginTop: 0, marginBottom: '24px' }}>
        <Title level={4} style={{ marginBottom: 0 }}>
          {formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'basic-info') })}
        </Title>
      </Divider>
      {/* 路由名称 */}
      <ProFormTreeSelect
        name="name"
        label={formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'name') })}
        colProps={{ span: 12 }}
        tooltip={formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'name.tooltip') })}
        fieldProps={{
          showSearch: true,
          treeNodeFilterProp: getLocale(),
          treeData: internationalData,
          fieldNames: {
            label: getLocale(),
            value: 'id',
          },
          onSelect: (value) => {
            if (!form.getFieldValue('path')) {
              const routePath = findNodePath(internationalData, value)
              form.setFieldValue('path', routePath);
              intelligentCompletion();
            }
          },
          treeDefaultExpandAll: true,
          showCheckedStrategy: TreeSelect.SHOW_PARENT,
          placeholder:
            formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
            formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'name') }),
        }}
        rules={[{ required: true }]}
      />
      <ProFormDependency name={['menu_type']}>
        {({ menu_type }) => {
          return menu_type === MENU_TYPE.MENU ? isMenuRender : null;
        }}
      </ProFormDependency>
      <ProFormDependency name={['menu_type']}>
        {({ menu_type }) => {
          return menu_type !== MENU_TYPE.BUTTON ? unButtonRender : null;
        }}
      </ProFormDependency>

      {/* 权限标识 */}
      <ProFormText
        name="permission"
        colProps={{ span: 12 }}
        label={formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'permission') })}
        placeholder={
          formatMessage({ id: INTERNATION.PLACEHOLDER }) +
          formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'permission') })
        }
        tooltip={formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'permission.tooltip') })}
        fieldProps={{ showCount: true, maxLength: 100 }}
      />
      {/* 排序 */}
      <ProFormSort colProps={{ span: 8 }} />
      {/* 状态 */}
      <ProFormStatus colProps={{ span: 8 }} />
      <Space>
        {form.getFieldValue('menu_type') !== MENU_TYPE.BUTTON &&
          <Tooltip
            title="智能补全数据，比如你填写了 路由地址，则应该按照约定填写组件路径和权限标识的表单，此时会帮你补全它们"
            color={'#108ee9'} key={'#108ee9'}
          >
            <Button type="primary" onClick={intelligentCompletion}>
              智能补全
            </Button>
          </Tooltip>}
        {form.getFieldValue('redirect') &&
          <Tooltip
            title="自动纠正数据，比如你填写了 redirect，则不应该有其它表单的输入，此时会帮你清空掉多余表单项"
            color={'#108ee9'} key={'#108ee9'}
          >
            <Button type="primary" onClick={correctData}>
              纠正数据
            </Button>
          </Tooltip>}
      </Space>

      <Divider />
      <ProFormDependency name={['menu_type']}>
        {({ menu_type }) => {
          return menu_type === MENU_TYPE.MENU ? <MenuFormRender /> : null;
        }}
      </ProFormDependency>
    </>
  );
};
export default FormTemplateItem;
