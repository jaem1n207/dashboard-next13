'use client';

import { Subtitle, Text } from '@tremor/react';
import { Input, Row, Col, Divider } from 'antd';
import Tree, { type DataNode, type DirectoryTreeProps } from 'antd/es/tree';
import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';

import ProjectCard, { User } from '../project-card';

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

  const [fakeProjects, setFakeProjects] = useState<Project[]>([]);

  useEffect(() => {
    const createRandomProject = (): Project => ({
      id: faker.string.uuid(),
      name: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      author: {
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        imageUrl: faker.image.avatar(),
      },
      members: Array.from({ length: 10 }).map(() => ({
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        imageUrl: faker.image.avatar(),
      })),
      thumbnail: faker.image.url(),
      bookmarked: Math.random() > 0.5,
    });

    const PROJECTS = faker.helpers.multiple(createRandomProject, {
      count: 30,
    });

    setFakeProjects(PROJECTS);
  }, []);

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
        <Col span={0} md={6} lg={8} xl={6} xxl={4} className="h-full overflow-auto">
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
          xl={18}
          xxl={20}
          className="h-full overflow-x-hidden overflow-y-auto">
          <Row gutter={[12, 12]}>
            {fakeProjects.map(project => (
              <Col key={project.id} span={12} lg={8} xl={6}>
                <ProjectCard
                  author={project.author}
                  date={project.createdAt}
                  imageUrl={project.thumbnail}
                  name={project.name}
                  users={project.members}
                  key={project.id}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Content;
