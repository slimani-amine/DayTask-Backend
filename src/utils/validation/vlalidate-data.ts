import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ProjectsService } from 'src/routes/projects/projects.service';
import { User } from 'src/routes/users/domain/user';
import { UsersService } from 'src/routes/users/users.service';

@Injectable()
export class ValidateData {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => ProjectsService))
    private readonly projectsService: ProjectsService,
  ) {}
  async vlaidateMembers(members: User[]) {
    const userIds = members.map((e) => e.id);
    if (new Set(userIds).size !== userIds.length) {
      throw new BadRequestException('Members must be unique');
    }
    const usersPromises = members.map((e) =>
      this.usersService.findOne({
        id: e.id,
      }),
    );
    const users = await Promise.all(usersPromises);
    if (users.includes(null)) {
      throw new BadRequestException(
        `User with id ${members[users.indexOf(null)].id} not found`,
      );
    }
  }
  async validateProjectId(projectId: number) {
    const project = await this.projectsService.findOne(projectId);
    if (!project) {
      throw new BadRequestException(`Project with id ${projectId} not found`);
    }
  }
}
