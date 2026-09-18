/**
 * Описание социально сети.
 * @public
 */
export default interface ISocialNetwork {
    /**
     * ID социальной сети.
     */
    id: string;
    /**
     * Имя социальной сети.
     */
    name: string;
    /**
     * URL с помощью которого можно поделиться ссылкой в этой социально сети.
     */
    shareLink: string;
}
