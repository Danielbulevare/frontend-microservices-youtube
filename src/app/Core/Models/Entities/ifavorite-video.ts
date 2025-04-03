import { UUID } from "crypto";

export interface IFavoriteVideo {
    id: UUID;
    userId: UUID;
    videoId: string;
    title: string;
    url: string;
}
