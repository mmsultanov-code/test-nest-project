import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, Unique } from 'typeorm';
import { User } from './../../user/entities/user.entity';

export enum PageLocale {
  RU = 'ru',
  UZ = 'uz',
  EN = 'en',
}

@Entity({ name: 'page' })
@Unique(['locale', 'slug'])
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  name: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  slug: string;

  @Column({ type: 'enum', enum: PageLocale, default: PageLocale.RU, nullable: true })
  locale: PageLocale;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  page_thumbnail: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  meta_title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  meta_description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  meta_keywords: string;

  @ManyToOne(() => Page, page => page.children, { nullable: true })
  @JoinColumn({ name: 'parent_page_id' })
  parent: Page;

  @Column({ type: 'int', nullable: true })
  parent_page_id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @Column({ type: 'int', nullable: false })
  creator_id: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updater: User;

  @Column({ type: 'int', nullable: true })
  updated_by: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'jsonb', nullable: true, default: [] })
  constr: [];
  
  @OneToMany(() => Page, page => page.parent)
  children: Page[];
}