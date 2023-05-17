'use client';

import React, { useState } from 'react';
import { Button, Card, Avatar, Dropdown, Space, Popconfirm, Input } from 'antd';
import type { MenuProps } from 'antd';
import { BookOutlined, EditOutlined, MenuOutlined } from '@ant-design/icons';
import Image from 'next/image';

import Overlay from '@/components/overlay';
import { useOverlay } from '@/hooks/use-overlay';

const items: MenuProps['items'] = [
  {
    label: '1st menu item',
    key: '0',
  },
  {
    label: '2nd menu item',
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

export interface User {
  id: string;
  name: string;
  imageUrl: string;
}

interface ProjectCardProps {
  imageUrl: string;
  name: string;
  author: User;
  users: User[];
  date: Date;
}

const ProjectCard = ({ imageUrl, name, author, users, date }: ProjectCardProps) => {
  const { overlayVisible, toggleOverlay } = useOverlay();

  const [newName, setNewName] = useState(name);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const onConfirm = () => {
    console.log(`new name: ${newName}`);
  };

  const renderUserAvatars = () => {
    const maxVisibleAvatars = 2;
    const usersToShow = users.slice(0, maxVisibleAvatars);
    const overflowCount = users.length - maxVisibleAvatars;

    return (
      <div className="flex justify-between">
        <div>
          <Avatar src={author.imageUrl} />
        </div>
        <div className="flex -space-x-2">
          {usersToShow.map(user => (
            <Avatar key={user.id} src={user.imageUrl} />
          ))}
          {overflowCount > 0 && <Avatar>+{overflowCount}</Avatar>}
        </div>
      </div>
    );
  };

  return (
    <Card
      className="relative cursor-default group"
      cover={
        <div className="relative" onClick={toggleOverlay}>
          <Image
            className="object-cover w-full h-52"
            src={imageUrl}
            alt={name}
            height="0"
            width="0"
            quality={80}
            loading="eager"
            sizes={`(min-width: 768px) 384px, (min-width: 1024px) 256px, (min-width: 1280px) 192px, (min-width: 1536px) 256px, 100vw`}
          />
          <div className="absolute top-0 left-0 z-10 p-2">
            <Button shape="circle" icon={<BookOutlined />} />
          </div>
          <Overlay
            isVisible={overlayVisible}
            topRight={
              <Dropdown menu={{ items }} trigger={['click']}>
                <a
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}>
                  <Space>
                    <Button icon={<MenuOutlined />} />
                  </Space>
                </a>
              </Dropdown>
            }>
            <div className="flex flex-col items-center justify-center h-full gap-y-2">
              <Button className="mx-2" onClick={() => console.log('click')}>
                Button 1
              </Button>
              <Button className="mx-2">Button 2</Button>
            </div>
          </Overlay>
        </div>
      }
      actions={[<div key="test-1">{date.toLocaleDateString()}</div>]}
      bodyStyle={{ padding: '12px' }}
      hoverable>
      <div>
        <Popconfirm
          icon={<EditOutlined />}
          title={
            <div>
              이름 수정:
              <Input defaultValue={name} value={newName} onChange={onNameChange} />
            </div>
          }
          cancelText="취소"
          okText="수정"
          onConfirm={onConfirm}>
          <a className="block mb-4 text-lg font-semibold truncate">{name}</a>
        </Popconfirm>
        {renderUserAvatars()}
      </div>
    </Card>
  );
};

export default ProjectCard;
