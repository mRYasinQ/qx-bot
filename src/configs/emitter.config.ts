import type { EventEmitterModuleOptions } from '@nestjs/event-emitter/dist/interfaces';

const EmitterConfig: EventEmitterModuleOptions = {
  global: true,
  wildcard: true,
  delimiter: '.',
};

export default EmitterConfig;
