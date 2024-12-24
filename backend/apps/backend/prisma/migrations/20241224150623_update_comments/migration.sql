-- Prisma Database Comments Generator v1.0.2

-- am_already comments
COMMENT ON COLUMN "am_already"."id" IS '主键id';
COMMENT ON COLUMN "am_already"."announcement_id" IS '活动公告 id';
COMMENT ON COLUMN "am_already"."user_id" IS '用户 id';

-- am_announcement comments
COMMENT ON COLUMN "am_announcement"."announcement_id" IS '活动公告id';
COMMENT ON COLUMN "am_announcement"."user_id" IS '作者id';
COMMENT ON COLUMN "am_announcement"."title" IS '标题';
COMMENT ON COLUMN "am_announcement"."content" IS '内容';
COMMENT ON COLUMN "am_announcement"."type" IS '类型(1:公告,2:活动,3:消息,4:通知)';
COMMENT ON COLUMN "am_announcement"."status" IS '状态（0:禁用，1：开启）';
COMMENT ON COLUMN "am_announcement"."pinned" IS '是否置顶（0:否，1：是）';

-- am_international comments
COMMENT ON COLUMN "am_international"."id" IS '国际化id';
COMMENT ON COLUMN "am_international"."name" IS '国际化字段';
COMMENT ON COLUMN "am_international"."parent_id" IS '父级id';
COMMENT ON COLUMN "am_international"."founder" IS '创建人';
COMMENT ON COLUMN "am_international"."sort" IS '排序';
COMMENT ON COLUMN "am_international"."created_time" IS '创建时间';
COMMENT ON COLUMN "am_international"."updated_time" IS '最后一次更新时间';

-- am_jobs comments
COMMENT ON COLUMN "am_jobs"."jobs_id" IS '岗位id';
COMMENT ON COLUMN "am_jobs"."jobs_name" IS '岗位名称';
COMMENT ON COLUMN "am_jobs"."org_id" IS '组织id';
COMMENT ON COLUMN "am_jobs"."parent_id" IS '父级id';
COMMENT ON COLUMN "am_jobs"."describe" IS '岗位描述';
COMMENT ON COLUMN "am_jobs"."sort" IS '排序';
COMMENT ON COLUMN "am_jobs"."leader" IS '岗位负责人';
COMMENT ON COLUMN "am_jobs"."founder" IS '创建人';

-- am_logs comments
COMMENT ON COLUMN "am_logs"."log_id" IS '日志id';
COMMENT ON COLUMN "am_logs"."user_id" IS '用户id';
COMMENT ON COLUMN "am_logs"."ip" IS 'ip';
COMMENT ON COLUMN "am_logs"."os" IS '操作系统';
COMMENT ON COLUMN "am_logs"."params" IS '请求参数';
COMMENT ON COLUMN "am_logs"."method" IS '请求方式';
COMMENT ON COLUMN "am_logs"."api_url" IS '请求地址';
COMMENT ON COLUMN "am_logs"."browser" IS '浏览器';
COMMENT ON COLUMN "am_logs"."province" IS '所在省份';
COMMENT ON COLUMN "am_logs"."city" IS '所在城市';
COMMENT ON COLUMN "am_logs"."adcode" IS '城市编码';

-- am_menu comments
COMMENT ON COLUMN "am_menu"."menu_id" IS '菜单id';
COMMENT ON COLUMN "am_menu"."name" IS '国际化对应的name';
COMMENT ON COLUMN "am_menu"."menu_type" IS '菜单类型（dir:目录，menu:菜单,button:按钮）';
COMMENT ON COLUMN "am_menu"."path" IS '路由url';
COMMENT ON COLUMN "am_menu"."icon" IS '菜单图标';
COMMENT ON COLUMN "am_menu"."component" IS '菜单对应的文件路径';
COMMENT ON COLUMN "am_menu"."redirect" IS '路由重定向地址';
COMMENT ON COLUMN "am_menu"."parent_id" IS '父级id';
COMMENT ON COLUMN "am_menu"."target" IS '当path是一个url，点击新窗口打开';
COMMENT ON COLUMN "am_menu"."permission" IS '菜单标识(页面按钮权限控制)';
COMMENT ON COLUMN "am_menu"."layout" IS '是否显示layout布局（side:侧边菜单，top:顶部菜单,mix:混合菜单）';
COMMENT ON COLUMN "am_menu"."navTheme" IS '导航菜单的主题（dark:暗黑风格，light:亮色风格）';
COMMENT ON COLUMN "am_menu"."headerTheme" IS '顶部导航的主题，mix 模式生效（dark:暗黑风格，light:亮色风格）';
COMMENT ON COLUMN "am_menu"."hideChildrenInMenu" IS '是否隐藏子路由';
COMMENT ON COLUMN "am_menu"."hideInMenu" IS '是否隐藏菜单，包括子路由';
COMMENT ON COLUMN "am_menu"."hideInBreadcrumb" IS '是否在面包屑中隐藏';
COMMENT ON COLUMN "am_menu"."headerRender" IS '是否显示顶栏';
COMMENT ON COLUMN "am_menu"."footerRender" IS '是否显示页脚';
COMMENT ON COLUMN "am_menu"."menuRender" IS '当前路由是否展示菜单';
COMMENT ON COLUMN "am_menu"."menuHeaderRender" IS '当前路由是否展示菜单顶栏';
COMMENT ON COLUMN "am_menu"."flatMenu" IS '子项往上提，只是不展示父菜单';
COMMENT ON COLUMN "am_menu"."fixedHeader" IS '固定顶栏';
COMMENT ON COLUMN "am_menu"."fixSiderbar" IS '固定菜单';
COMMENT ON COLUMN "am_menu"."founder" IS '创建人';
COMMENT ON COLUMN "am_menu"."sort" IS '排序';
COMMENT ON COLUMN "am_menu"."status" IS '菜单状态（0:禁用，1：正常）';

-- am_organization comments
COMMENT ON COLUMN "am_organization"."org_id" IS '组织id';
COMMENT ON COLUMN "am_organization"."org_name" IS '组织名称';
COMMENT ON COLUMN "am_organization"."parent_id" IS '父级id';
COMMENT ON COLUMN "am_organization"."org_code" IS '组织编码';
COMMENT ON COLUMN "am_organization"."org_type" IS '组织类型（group:集团,company:公司,unit:单位,department:部门）';
COMMENT ON COLUMN "am_organization"."org_logo" IS '组织logo';
COMMENT ON COLUMN "am_organization"."leader" IS '组织负责人';
COMMENT ON COLUMN "am_organization"."founder" IS '创建人';
COMMENT ON COLUMN "am_organization"."status" IS '组织状态（0:禁用，1：正常）';
COMMENT ON COLUMN "am_organization"."sort" IS '排序';
COMMENT ON COLUMN "am_organization"."describe" IS '组织描述';

-- am_permission comments
COMMENT ON COLUMN "am_permission"."permission_id" IS '权限id';
COMMENT ON COLUMN "am_permission"."role_id" IS '角色id';
COMMENT ON COLUMN "am_permission"."menu_id" IS '菜单id';

-- am_role comments
COMMENT ON COLUMN "am_role"."role_id" IS '角色id';
COMMENT ON COLUMN "am_role"."role_name" IS '角色名称';
COMMENT ON COLUMN "am_role"."role_code" IS '角色编码';
COMMENT ON COLUMN "am_role"."describe" IS '角色描述';
COMMENT ON COLUMN "am_role"."founder" IS '创建人';
COMMENT ON COLUMN "am_role"."sort" IS '排序';
COMMENT ON COLUMN "am_role"."status" IS '角色状态（0:禁用，1：正常）';

-- am_user comments
COMMENT ON COLUMN "am_user"."user_id" IS '用户id';
COMMENT ON COLUMN "am_user"."user_name" IS '用户名称';
COMMENT ON COLUMN "am_user"."work_no" IS '用户工号';
COMMENT ON COLUMN "am_user"."password" IS '密码(加密)';
COMMENT ON COLUMN "am_user"."cn_name" IS '中文名';
COMMENT ON COLUMN "am_user"."en_name" IS '英文名';
COMMENT ON COLUMN "am_user"."age" IS '年龄';
COMMENT ON COLUMN "am_user"."email" IS '电子邮箱';
COMMENT ON COLUMN "am_user"."phone" IS '电话号码';
COMMENT ON COLUMN "am_user"."avatar_url" IS '用户头像';
COMMENT ON COLUMN "am_user"."sex" IS '用户性别(0:女,1:男,2:隐私)';
COMMENT ON COLUMN "am_user"."sort" IS '排序';
COMMENT ON COLUMN "am_user"."status" IS '用户状态（0:禁用，1：正常）';
COMMENT ON COLUMN "am_user"."token" IS 'token';
COMMENT ON COLUMN "am_user"."motto" IS '座右铭';
COMMENT ON COLUMN "am_user"."tags" IS '人物标签';
COMMENT ON COLUMN "am_user"."city" IS '所属城市';
COMMENT ON COLUMN "am_user"."address" IS '详细地址';
COMMENT ON COLUMN "am_user"."jobs_id" IS '岗位id';
COMMENT ON COLUMN "am_user"."org_id" IS '组织id';
COMMENT ON COLUMN "am_user"."role_id" IS '角色id';
COMMENT ON COLUMN "am_user"."founder" IS '创建人';
COMMENT ON COLUMN "am_user"."login_num" IS '登录次数';
COMMENT ON COLUMN "am_user"."login_last_ip" IS '最后一次登录ip';
COMMENT ON COLUMN "am_user"."login_last_time" IS '最后一次登录时间';
