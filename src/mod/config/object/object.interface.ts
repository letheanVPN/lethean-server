import { ApiProperty } from "https://deno.land/x/danet_swagger/decorators.ts";

export class ConfigObjectGetDTO {
  @ApiProperty()
  group: string;
  @ApiProperty()
  object: string;
}

export class ConfigObjectSetDTO {
  @ApiProperty()
  group: string;
  @ApiProperty()
  object: string;
  @ApiProperty()
  data: string;
}

export class ConfigObjectRemoveDTO {
  @ApiProperty()
  group: string;
  @ApiProperty()
  object: string;
}

export class ConfigObjectClearDTO {
  @ApiProperty()
  group: string;
}

export class ConfigObjectCountDTO {
  @ApiProperty()
  group: string;
}
