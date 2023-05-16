'use client';

import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

export interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface PartnersTableProps {
  partners: Partner[];
  searchValue: string;
}

const PartnersTable = ({ partners, searchValue }: PartnersTableProps) => {
  const filteredPartners = useMemo(() => {
    if (!searchValue) {
      return partners;
    }

    return partners.filter(partner => {
      return partner.name.includes(searchValue) || partner.email.includes(searchValue);
    });
  }, [partners, searchValue]);

  return (
    <Table>
      <TableHead>
        <TableHeaderCell>이름</TableHeaderCell>
        <TableHeaderCell>이메일</TableHeaderCell>
        <TableHeaderCell>전화번호</TableHeaderCell>
      </TableHead>
      <TableBody>
        {filteredPartners.map(partner => (
          <TableRow key={partner.id}>
            <TableCell>{partner.name}</TableCell>
            <TableCell>{partner.email}</TableCell>
            <TableCell>{partner.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PartnersTable;
