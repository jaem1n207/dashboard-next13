'use client';

import { Subtitle, Text } from '@tremor/react';
import { Input, Row, Col, Divider } from 'antd';
import Tree, { type DataNode, type DirectoryTreeProps } from 'antd/es/tree';
import React from 'react';

const CustomDivider = () => <Divider type="horizontal" className="my-3 sm:my-4" />;

const { Search } = Input;

const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
];

type User = {
  id: string;
  name: string;
  thumbnail: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  members: User[];
  thumbnail: string;
  bookmarked: boolean;
};

const Content = () => {
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  const fakeProjects: Project[] = Array.from({ length: 30 }).map((_, i) => ({
    id: `${i}`,
    name: `프로젝트 ${i}`,
    description: `프로젝트 ${i} 설명`,
    createdAt: new Date(),
    updatedAt: new Date(),
    author: {
      id: `${i}`,
      name: `유저 ${i}`,
      thumbnail: `https://picsum.photos/seed/${i}/200/300`,
    },
    members: Array.from({ length: 2 }).map((_, j) => ({
      id: `${j}`,
      name: `유저 ${j}`,
      thumbnail: `https://picsum.photos/seed/${j}/200/300`,
    })),
    thumbnail: `https://picsum.photos/seed/${i}/200/300`,
    bookmarked: Math.random() > 0.5,
  }));

  return (
    <>
      <Row gutter={[8, 4]} align="middle">
        <Col span={8} md={4} xxl={2}>
          <Subtitle className="my-2 text-black sm:my-4">내 프로젝트</Subtitle>
        </Col>
        <Col span={16} md={20} xxl={22}>
          <Search
            placeholder="프로젝트 이름을 검색해보세요"
            enterButton
            onSearch={value => {
              console.log('search', value);
            }}
          />
        </Col>
      </Row>
      <CustomDivider />
      <Row>
        <Col span={24} className="p-2 rounded-md bg-blue-50">
          <Text className="m-0 text-blue-500 sm:m-1">업데이트 소식</Text>
        </Col>
      </Row>
      <CustomDivider />
      <Row className="flex-1 overflow-auto" align="top" gutter={[12, 4]}>
        <Col span={0} md={6} lg={8} xxl={4} className="h-full overflow-auto">
          <DirectoryTree
            multiple
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
          />
        </Col>
        <Col
          span={24}
          md={18}
          lg={16}
          xxl={20}
          className="h-full overflow-x-hidden overflow-y-auto">
          <Row>
            {fakeProjects.map(project => (
              <Col key={project.id} span={12} md={8} lg={6}>
                <Text>{project.name}</Text>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Content;
