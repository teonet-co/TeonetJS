/*
 * The MIT License
 *
 * Copyright 2016 Kirill Scherba <kirill@scherba.ru>.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';


var ref = require('ref');
var ffi = require('ffi');
var ArrayType = require('ref-array');
var StructType = require('ref-struct');
var StringArray = ArrayType('string');

var uint16Ptr = ref.refType('uint16');
var sizePtr = ref.refType('size_t');

/**
 * Define the "ksnCorePacketData" struct type
 *
 */
var ksnCorePacketData = StructType({

    addr: 'string',                 ///< @param {'string'} addr Remote peer IP address
    port: 'int',                    ///< @param {'int'} port Remote peer port
    mtu: 'int',                     ///< @param {'int'} mtu Remote mtu
    from: 'string',                 ///< @param {'string'} from Remote peer name
    from_len: 'uint8',              ///< @param {'uint8'} from_len Remote peer name length

    cmd: 'uint8',                   ///< @param {'uint8'} cmd Command ID

    data: 'string',                 ///< @param {'pointer'} data Received data
    data_len: 'size_t',             ///< @param {'size_t'} data_len Received data length

    raw_data: 'pointer',            ///< @param {'pointer'} raw_data Received packet data
    raw_data_len: 'size_t',         ///< @param {'size_t'} raw_data_len Received packet length

    arp: 'pointer', /* ksnet_arp_data * */    ///< @param {'pointer'} arp Pointer to ARP Table data

    l0_f: 'int'                     ///< @param {'int'} l0_f L0 command flag (from set to l0 client name)
});
var ksnCorePacketDataPtr = ref.refType(ksnCorePacketData);


/**
 * Define the "ksnCorePacketData" struct type
 *
 */
var ksnCorePacketDataUint16 = StructType({

    addr: 'string',                 ///< @param {'string'} addr Remote peer IP address
    port: 'int',                    ///< @param {'int'} port Remote peer port
    mtu: 'int',                     ///< @param {'int'} mtu Remote mtu
    from: 'string',                 ///< @param {'string'} from Remote peer name
    from_len: 'uint8',              ///< @param {'uint8'} from_len Remote peer name length

    cmd: 'uint8',                   ///< @param {'uint8'} cmd Command ID

    data: uint16Ptr,                ///< @param {'pointer'} data Received data
    data_len: 'size_t',             ///< @param {'size_t'} data_len Received data length

    raw_data: 'pointer',            ///< @param {'pointer'} raw_data Received packet data
    raw_data_len: 'size_t',         ///< @param {'size_t'} raw_data_len Received packet length

    arp: 'pointer', /* ksnet_arp_data * */    ///< @param {'pointer'} arp Pointer to ARP Table data

    l0_f: 'int'                     ///< @param {'int'} l0_f L0 command flag (from set to l0 client name)
});

/**
 * Define the "ksnCorePacketData" struct type
 *
 */
var ksnCorePacketDataPointer = StructType({

    addr: 'string',                 ///< @param {'string'} addr Remote peer IP address
    port: 'int',                    ///< @param {'int'} port Remote peer port
    mtu: 'int',                     ///< @param {'int'} mtu Remote mtu
    from: 'string',                 ///< @param {'string'} from Remote peer name
    from_len: 'uint8',              ///< @param {'uint8'} from_len Remote peer name length

    cmd: 'uint8',                   ///< @param {'uint8'} cmd Command ID

    data: 'pointer',                ///< @param {'pointer'} data Received data
    data_len: 'size_t',             ///< @param {'size_t'} data_len Received data length

    raw_data: 'pointer',            ///< @param {'pointer'} raw_data Received packet data
    raw_data_len: 'size_t',         ///< @param {'size_t'} raw_data_len Received packet length

    arp: 'pointer', /* ksnet_arp_data * */    ///< @param {'pointer'} arp Pointer to ARP Table data

    l0_f: 'int'                     ///< @param {'int'} l0_f L0 command flag (from set to l0 client name)
});

/**
 * KSNet command class data
 */
var ksnCommandClass = StructType({

    kc: 'pointer', ///< Pointer to KSNet core class object
    ks: 'pointer', ///< Pointer to KSNet split class
    kr: 'pointer', ///< Pointer to KSNet reconnect class
    ksscr: 'pointer' ///< Pointer to teoSScrClass

});
var ksnCommandClassPtr = ref.refType(ksnCommandClass);

/**
 * The "ksnCoreClass" struct type
 */
var ksnCoreClass = StructType({

    name: 'string',          ///< Host name
    name_len: 'uint8',       ///< Host name length
    addr: 'string',          ///< Host IP address
    port: 'int',             ///< Host IP port
    fd: 'int',               ///< Host socket file descriptor

    last_check_event: 'double', ///< Last time of check host event
    ka: 'pointer', /* ksnetArpClass * */       ///< Arp table class object
    kco: ksnCommandClassPtr    ///< Command class object
//    ksnTRUDPClass *ku;       ///< TR-UDP class object
//    #if KSNET_CRYPT
//    ksnCryptClass *kcr;      ///< Crypt class object
//    #endif
//    ev_io host_w;            ///< Event Manager host (this host) watcher
//    void *ke;                ///< Pointer to Event manager class object
//
//    #ifdef HAVE_MINGW
//    WSADATA wsaData;
//    #endif

});
var ksnCoreClassPtr = ref.refType(ksnCoreClass);

var ksnet_cfg = StructType({

    ke: 'pointer'       ///< Poiner to ksnetEventManager
//
//    // Flags
//    show_connect_f: 'int',    ///< Show connection message
//    show_debug_f: 'int',     ///< Show debug messages
//    show_debug_vv_f: 'int', ///< Show debug vv messages
//    show_debug_vvv_f: 'int', ///< Show debug vvv messages
//    show_peers_f: 'int',   ///< Show peers at start up
//    hot_keys_f: 'int',    ///< Show hotkeys when press h
//    crypt_f: 'int',      ///< Encrypt/Decrypt packets
//    vpn_connect_f: 'int',  ///< Start VPN flag
//    show_tr_udp_f: 'int', ///< Show TR-UDP statistic at start up
//    sig_segv_f: 'int', ///< SIGSEGV processing
//    block_cli_input_f: 'int' ///< Block teonet CLI input (for using in GUI application)
//
//    // Daemon mode flags
//    int dflag,  ///< Start application in Daemon mode
//        kflag;  ///< Kill application in Daemon mode
//
//    // Network
//    char network[KSN_BUFFER_SM_SIZE/2];     ///< Network
//    char net_key[KSN_BUFFER_SM_SIZE/2];     ///< Network key
//
//    // Application name
//    char app_prompt[KSN_BUFFER_SM_SIZE/2];      ///< Application prompt
//    char app_name[KSN_BUFFER_SM_SIZE/2];        ///< Application name
//    char app_description[KSN_BUFFER_SM_SIZE/2]; ///< Application description
//
//    // Application parameters
//    int app_argc; ///< Number of requered application parameters
//    char **app_argv; ///< Array of application parameters
//
//    // Host name & port
//    long port;                              ///< This host port number
//    int  port_inc_f;                        ///< Increment host port if busy
//    char host_name[KSN_MAX_HOST_NAME];      ///< This host name
//
//    // TCP Proxy
//    int  tcp_allow_f;       ///< Allow TCP Proxy connections to this host
//    long tcp_port;          ///< TCP Proxy port number
//
//    // L0 Server
//    int  l0_allow_f;                             ///< Allow L0 Server and l0 client connections to this host
//    char l0_tcp_ip_remote[KSN_BUFFER_SM_SIZE/2]; ///< L0 Server remote IP address (send clients to connect to server)
//    long l0_tcp_port;                            ///< L0 Server TCP port number
//
//    // R-Host
//    char r_host_addr[KSN_BUFFER_SM_SIZE/2]; ///< Remote host internet address
//    long r_port;                            ///< Remote host port
//    long r_tcp_port;                        ///< Remote host tcp port
//    int r_tcp_f;            ///< Connect to TCP Proxy R-Host
//
//    // VPN
//    char vpn_dev_name[KSN_MAX_HOST_NAME];   ///< VPN Interface device name
//    char vpn_dev_hwaddr[KSN_MAX_HOST_NAME]; ///< VPN Interface MAC address
//    char vpn_ip[KSN_BUFFER_SM_SIZE/2];      ///< VPN Interface IP
//    long vpn_ip_net;                        ///< VPN Interface network mask
//    long vpn_mtu;                           ///< VPN Interface MTU
//
//    // Terminal
////    char t_username[KSN_BUFFER_SM_SIZE/2]; ///< User name to login to terminal
////    char t_password[KSN_BUFFER_SM_SIZE/2]; ///< Password to login to terminal
//
//    // Syslog options
//    long log_priority;                       ///< Syslog priority
//
//    // Helpers
//    int pp;
//    char pn[KSN_BUFFER_SM_SIZE];
//    char r_host_name[KSN_MAX_HOST_NAME];    ///< Remote host name (if connected)

});


/**
 * KSNet event manager functions data
 * After call ksnetEvMgrClass(ke_ptr) ke['ref.buffer'] will contain original pointer
 */
var ksnetEvMgrClass = StructType({

    // Pointers to Modules classes
    km: 'pointer',          ///< Pointer to multi net class
    kc: ksnCoreClassPtr,    ///< Pointer to ksnCoreClass core class
    kh: 'pointer',          //    ksnetHotkeysClass *kh; ///< Hotkeys class
    kvpn: 'pointer',         //    ksnVpnClass *kvpn; ///< VPN class
    kt: 'pointer',          //    ksnTcpClass *kt; ///< TCP Client/Server class
    kl: 'pointer',          //    ksnLNullClass *kl; ///< L0 Server class
    tp: 'pointer',          //    ksnTCPProxyClass *tp; ///< TCP Proxy class
    ktun: 'pointer',        //    ksnTunClass *ktun; ///< Tunnel class
    kter: 'pointer',        //    ksnTermClass *kter; ///< Terminal class
    kq: 'pointer',          //    ksnCQueClass *kq; ///< Callback QUEUE class
    kf: 'pointer',          //    ksnTDBClass *kf; ///< PBL KeyFile class
    ks: 'pointer',          //    ksnStreamClass *ks; ///< Stream class

    ksn_cfg: ksnet_cfg      //    ksnet_cfg ksn_cfg; ///< KSNet configuration
//
//    int runEventMgr; ///< Run even manages (stop if 0)
//    uint32_t timer_val; ///< Event loop timer value
//    uint32_t idle_count; ///< Idle callback count
//    uint32_t idle_activity_count; ///< Idle activity callback count
//    void (*event_cb)(struct ksnetEvMgrClass *ke, ksnetEvMgrEvents event, void *data, size_t data_len, void *user_data);
//    struct ev_loop *ev_loop; ///< Event loop
//
//    // Event Manager Watchers
//    ev_idle idle_w;         ///< Idle TIMER watcher
//    ev_idle idle_activity_w;///< Idle Check activity watcher
//    ev_timer timer_w;       ///< Timer watcher
//    ev_async sig_async_w;   ///< Async signal watcher
//
//    double custom_timer_interval;   ///< Custom timer interval
//    double last_custom_timer;       ///< Last time the custom timer called
//
//    PblList* async_queue;   ///< Async data queue
//    pthread_mutex_t async_mutex; ///< Async data queue mutex
//
//    size_t n_num; ///< Network number
//    void *n_prev; ///< Previouse network
//    void *n_next; ///< Next network
//    size_t num_nets; ///< Number of networks
//
//    // Define signals watchers
//    ev_signal sigint_w;  ///< Signal SIGINT watcher
//    ev_signal sigterm_w; ///< Signal SIGTERM watcher
//    ev_signal sigsegv_w; ///< Signal SIGSEGV watcher
//    ev_signal sigabrt_w; ///< Signal SIGABRT watcher
//    #ifndef HAVE_MINGW
//    ev_signal sigquit_w; ///< Signal SIGQUIT watcher
//    ev_signal sigkill_w; ///< Signal SIGKILL watcher
//    ev_signal sigstop_w; ///< Signal SIGSTOP watcher
//    #endif
//
//    void *user_data; ///< Pointer to user data or NULL if absent
//
//    struct cli_def *cli;
//
//    int argc;         ///< Applications argc
//    char** argv;      ///< Applications argv
//
//    char *type;         ///< Application type

});
var ksnetEvMgrClassPtr = ref.refType(ksnetEvMgrClass);

/**
 * KSNet ARP Data structure
 * @type type
 */
var ksnetArpData = StructType({

    mode: 'int16',                      ///< Peers mode: -1 - This host, -2 undefined host, 0 - peer , 1 - r-host, 2 - TCP Proxy peer
    //char addr[ARP_TABLE_IP_SIZE];       ///< Peer IP address
    addr: ArrayType('char', 48),        ///< Peer IP address
    port: 'int16',                      ///< Peer port

    lastActivity: 'double',             ///< Last time receved data from peer
    lastTriptimeSend: 'double',         ///< Last time when triptime request send
    lastTriptimeGot: 'double',          ///< Last time when triptime received

    tripTimeLast: 'double',             ///< Last triptime
    tripTime: 'double',                 ///< Middle triptime

    monitorTime: 'double',              ///< Monitor ping time

    connectedTime: 'double'             ///< Time when peer was connected to this peer

});
var ksnetArpDataPtr = ref.refType(ksnetArpData);


var ksnCQueClass = StructType({

    ke: ksnetEvMgrClassPtr,     ///< Pointer to ksnEvMgrClass
    id: 'uint32',               ///< New callback queue ID
    cque_map: 'pointer'         ///< Pointer to the callback queue pblMap

});
var ksnCQueClassPtr = ref.refType(ksnCQueClass);

/**
 * KSNet Callback Queue Data structure
 *
 * @type type
 */
var ksnCQueData = StructType({

    cb: 'pointer', //ksnCQueCallback, ///< Pointer to callback function
    kq: ksnCQueClassPtr, ///< Pointer to ksnCQueClass
    timeout: 'double',   ///< Timeout value
    id: 'uint32',        ///< Callback ID (equal to key)
    data: 'pointer'      ///< User data
    //w: ev_timer          ///< Timeout watcher

});
var ksnCQueDataPtr = ref.refType(ksnCQueData);

/**
 * TeoDB Data structure
 *
 * @type type
 */
var teoDBData = StructType({
    key_length: 'uint8',
    data_length: 'uint32',
    id: 'uint32',
    key_data: 'string'
});
var teoDBDataPtr = ref.refType(teoDBData);

function getLength(data) {
    return data ? data.length + 1 : 0;
}


//module.exports = ffi.Library('/home/kirill/Projects/teonet/src/.libs/libteonet', {
module.exports = {

    /**
     * TODO: Teonet events enum
     */
    ev: {

        /*
         * Default event description example:
         *
         * Description:
         * #0 Calls immediately after event manager starts
         *
         * Parameters definition:
         *
         * @param {'pointer'} ke Pointer to ksnetEvMgrClass
         * @param {int} ev This event
         * @param {'pointer'} data Pointer to data, usually Pointer to ksnCorePacketData
         * @param {'size_t'} data_len Size of data, usually size f ksnCorePacketData
         * @param {'pointer'} user_data Pointer to user data
         */

        /**
         * #0 Calls immediately after event manager starts
         *
         * @param {'pointer'} ke Pointer to ksnetEvMgrClass
         * @param {int} ev This event
         * @param {'pointer'} data null
         * @param {'size_t'} data_len 0
         * @param {'pointer'} user_data null
         */
        EV_K_STARTED: 0,

        /**
         * #1 Calls before event manager stopped
         *
         * @param {'pointer'} ke Pointer to ksnetEvMgrClass
         * @param {int} ev This event
         * @param {'pointer'} data null
         * @param {'size_t'} data_len 0
         * @param {'pointer'} user_data null
         */
        EV_K_STOPPED_BEFORE: 1,

        /**
         * #2 Calls after event manager stopped
         *
         * @param {'pointer'} ke Pointer to ksnetEvMgrClass
         * @param {int} ev This event
         * @param {'pointer'} data null
         * @param {'size_t'} data_len 0
         * @param {'pointer'} user_data null
         */
        EV_K_STOPPED: 2,

        /**
         * #3 New peer connected to host event
         *
         * @param {'pointer'} ke Pointer to ksnetEvMgrClass
         * @param {int} ev This event
         * @param {'pointer'} data Pointer to ksnCorePacketData
         * @param {'size_t'} data_len Size of ksnCorePacketData
         * @param {'pointer'} user_data null
         */
        EV_K_CONNECTED: 3,

        /**
         * #4 A peer was disconnected from host
         *
         * @param {'pointer'} ke Pointer to ksnetEvMgrClass
         * @param {int} ev This event
         * @param {'pointer'} data Pointer to ksnCorePacketData
         * @param {'size_t'} data_len Size of ksnCorePacketData
         * @param {'pointer'} user_data null
         */
        EV_K_DISCONNECTED: 4,

        EV_K_RECEIVED: 5,      ///< #5  This host Received a data

        /**
         * Reset command, data: byte or char 0 - soft reset; 1 - hard reset
         */
        CMD_RESET: 8,

        /**
         * #9 Timer event, seted by ksnetEvMgrSetCustomTimer
         *
         * @param {'pointer'} ke Pointer to ksnetEvMgrClass
         * @param {int} ev This event
         * @param {'pointer'} data null
         * @param {'size_t'} data_len 0
         * @param {'pointer'} user_data null
         */
        EV_K_TIMER: 9,

        /**
         * Hotkey event
         */
        EV_K_HOTKEY: 10,

        /**
         * User press A hotkey
         */
        EV_K_USER: 11,

        // \todo Fill next events

        EV_K_SUBSCRIBE: 19,     // Subscribe answer command received
        EV_K_SUBSCRIBED: 20,

        /**
         * #27 Angular interval event happened
         *
         * This event sends by Angular Teonet Service running in Teonet Node
         * Application when Angular interval tick happened
         *
         * Parameters of Teonet Events callback function:
         *
         * @param ke Pointer to ksnetEvMgrClass
         * @param event This event
         * @param data NULL
         * @param data_len 0
         * @param user_data NULL
         */
        EV_A_INTERVAL: 27

    },

    /**
     * Teonet ksnetEvMgrOpts enum
     */
    opts: {

        READ_OPTIONS: 0x01, ///! Read options at init
        READ_CONFIGURATION: 0x02,  ///! Read configuration files at init
        READ_ALL: 0x03, ///! Read options and configuration files = READ_OPTIONS|READ_CONFIGURATION,
        APP_PARAM: 0x04, ///! Process aditional applications parameters
        BLOCK_CLI_INPUT: 0x08 ///! Block CLI input

    },

    /**
     * The "ksnCorePacketData" struct type
     *
     * @param {'string'} addr Remote peer IP address
     * @param {'int'} port Remote peer port
     * @param {'int'} mtu Remote mtu
     * @param {'string'} from Remote peer name
     * @param {'uint8'} from_len Remote peer name length
     * @param {'uint8'} cmd Command ID
     * @param {'pointer'} data Received data
     * @param {'size_t'} data_len Received data length
     * @param {'pointer'} raw_data Received packet data
     * @param {'size_t'} raw_data_len Received packet length
     * @param {'pointer'} arp Pointer to ARP Table data
     * @param {'int'} l0_f L0 command flag (from set to l0 client name)
     *
     */
    'packetData': ksnCorePacketData,
    //'ksnCorePacketDataPtr': ksnCorePacketDataPtr,

    'packetDataUint16': ksnCorePacketDataUint16,
    //'ksnCorePacketDataUint16Ptr': ksnCorePacketDataUint16Ptr,

    'packetDataPointer': ksnCorePacketDataPointer,

    /**
     * The "ksnetEvMgrClass" struct type
     */
    'ksnetEvMgrClass': ksnetEvMgrClass,
    //'ksnetEvMgrClassPtr': ksnetEvMgrClassPtr,

    /**
     * "The "ksnCoreClass" struct type
     */
    'ksnCoreClass': ksnCoreClass,
    //'ksnCoreClassPtr': ksnCoreClassPtr,

    /**
     * "The "ksnetArpData" struct type
     */
    'arpData': ksnetArpData,
    //'arpDataPtr': ksnetArpDataPtr,

    /**
     * The "ksnCQueData" structure type
     */
    'cqueData': ksnCQueData,
    //'cqueDataPtr': ksnCQueDataPtr,

    lib: ffi.Library('libteonet', {

        /**
         * Get teonet library version
         *
         * @return {'string'} Teonet library version
         */
        'teoGetLibteonetVersion': ['string', []],

        'ksnetEvMgrInit': ['pointer', ['int', StringArray, 'pointer', 'int']],

        /**
         * Start KSNet Event Manager and network communication
         *
         * @param {'pointer'} ke Pointer to ksnetEvMgrClass
         * @return {'int'} Alway return 0
         */
        'ksnetEvMgrRun': ['int', ['pointer']],

        /**
	 * Stop event manager
	 *
	 * @param {'pointer'} ke Pointer to ksnetEvMgrClass
	 */
	'ksnetEvMgrStop': ['void', ['pointer']],

        /**
         * Set custom timer interval. The event EV_K_TIMER will be send after
         * every time_interval period.
         *
         * @param {'pointer'} ke Pointer to ksnetEvMgrClass
         * @param {'double'}  time_interval Timer interval
         */
        'ksnetEvMgrSetCustomTimer': ['void', ['pointer', 'double']],

        /**
         * Set Teonet application type
         *
         * @param {'pointer'} ke Pointer to ksnetEvMgrClass
         * @param {'string'}  type Application type string
         */
        'teoSetAppType': ['void', ['pointer', 'string']],

        /**
         * Set Teonet application version
         *
         * @param {'pointer'} ke Pointer to ksnetEvMgrClass
         * @param {'string'}  type Application version string
         */
        'teoSetAppVersion': ['void', ['pointer', 'string']],

        /**
         * Get Teonet event manager time
         *
         * @param {'pointer'} kc Pointer to ksnCoreClass
         *
         * @return Teonet event manager time
         */
        'ksnetEvMgrGetTime': ['double', ['pointer']],

        /**
         * Send command by name to peer
         *
         * @param {'pointer'} kc Pointer to ksnCoreClass
         * @param {'string'} to Peer name to send to
         * @param {'uint8'} cmd Command number
         * @param {'pointer'} data Commands data
         * @param {'size_t'} data_len Commands data length
         *
         * @return {'pointer'} Pointer to ksnet_arp_data or null if "to" peer is absent
         */
        'ksnCoreSendCmdto': ['pointer', ['pointer', 'string', 'uint8', 'string', 'size_t']],

        // ksnCoreSendto(kco->kc, rd->addr, rd->port, CMD_ECHO_ANSWER,
        //          rd->data, rd->data_len);
        'ksnCoreSendto': ['pointer', ['pointer', 'string', 'int', 'uint8', 'string', 'size_t']],

        // int ksnCommandSendCmdEcho(ksnCommandClass *kco, char *to, void *data,
        //                    size_t data_len)
        'ksnCommandSendCmdEcho': ['int', ['pointer', 'string', 'string', 'size_t']],

        /**
         * Send data to L0 client. Usually it is an answer to request from L0 client
         *
         * @param {'pointer'} ke Pointer to ksnetEvMgrClass
         * @param {'string'} addr IP address of remote peer
         * @param {'int'} port Port of remote peer
         * @param {'string'} cname L0 client name (include trailing zero)
         * @param {'size_t'} cname_length Length of the L0 client name
         * @param {'uint8'} cmd Command
         * @param {'string'} data Data
         * @param {'size_t'} data_len Data length
         *
         * @return {'int'} Return 0 if success; -1 if data length is too lage (more than 32319)
         */
        'ksnLNullSendToL0': ['int', ['pointer', 'string', 'int', 'string', 'size_t', 'uint8', 'string', 'size_t']],

        /**
         * Send event and it data to all subscribers
         *
         * @param sscr Pointer to teoSScrClass
         * @param ev Event
         * @param data Event data
         * @param data_length Event data length
         * @param cmd Command, used for EV_K_RECEIVED event to show received command
         */
        //'teoSScrSend': ['void', ['pointer', 'uint16', 'string', 'size_t', 'uint8']],
        'teoSScrSend': ['void', ['pointer', 'uint16', 'pointer', 'size_t', 'uint8']],

        'syslog': ['void', ['int', 'string']],

        /**
         * Get this host name
         *
         * @param {'pointer'} ke Pointer to ksnetEvMgrClass
         *
         * @return {'string'} Return this host name
         */
        'ksnetEvMgrGetHostName': ['string', ['pointer']],

        /**
         * Get application version
         *
         * @param {'pointer'} ke Pointer to ksnetEvMgrClass
         *
         * @return {'string'} Return application version
         */
        'teoGetAppVersion': ['string', ['pointer']],

        /**
         * Get application type
         *
         * @param {'pointer'} ke Pointer to ksnetEvMgrClass
         *
         * @return {'string'} Return application type
         */
        'teoGetAppType': ['string', ['pointer']],

        /**
         * Get pointer to ARP Data
         *
         * @param {'pointer'} ka Pointer to ksnetArpClass
         * @param {'string'} name Peer name
         *
         * @return {ksnetArpDataPtr} Pointer to ksnetArpData structure
         *
         */
        'ksnetArpGet': [ksnetArpDataPtr, ['pointer', 'string']],

        /**
         * KSNet Callback Queue module Initialize
         *
         * @param {ksnetEvMgrClassPtr} ke Pointer to ksnetEvMgrClass structure
         *
         * @return {ksnCQueClassPtr} Ponter to ksnCQueClass structure
         *
         */
        //'ksnCQueInit': [ksnCQueClassPtr, [ksnetEvMgrClassPtr]],

        /**
         * Destroy KSNet Callback Queue module
         *
         * @param {ksnCQueClassPtr} kq Pointer to ksnCQueClass structure
         */
        //'ksnCQueDestroy': ['void', [ksnCQueClassPtr]],

        /**
         * Execute callback queue record
         *
         * Get callback queue record and remove it from queue
         *
         * @param {ksnCQueClassPtr} kq Pointer to ksnCQueClass
         * @param {'uint32'} id Required ID
         *
         * @return {'int'} return 0: if callback executed OK; !=0 some error occurred
         */
        'ksnCQueExec': ['int', [ksnCQueClassPtr, 'uint32']],


        /**
         * Set callback queue data, update data set in ksnCQueAdd
         *
         * @param {ksnCQueClassPtr} kq Pointer to ksnCQueClass
         * @param {'uint32'} id Existing callback queue ID
         * @param {'string'} data Pointer to callback queue records data
         *
         * @return {'int'} return 0: if callback executed OK; !=0 some error occurred
         */
        'ksnCQueSetData': ['int', [ksnCQueClassPtr, 'uint32', 'string']],

        /**
         * Add callback to queue
         *
         * @param {ksnCQueClassPtr} kq Pointer to ksnCQueClass
         * @param {'pointer'} cb Callback [function](@ref ksnCQueCallback) or NULL. The teonet event
         *           EV_K_CQUE_CALLBACK should be send at the same time.
         * @param {'double'} timeout Callback timeout. If equal to 0 than timeout sets automatically
         * @param {'string'} data The user data which should be send to the Callback function
         *
         * @return Pointer to added ksnCQueData or NULL if error occurred
         */
        'ksnCQueAdd': [ksnCQueDataPtr, [ksnCQueClassPtr, 'pointer', 'double', 'string']],

        /**
         * Prepare teonet db data
         *
         * @param key Key
         * @param key_len Key length
         * @param data Pointer to value
         * @param data_len Value length
         * @param id Request ID
         * @param tdd_len Pointer to variable to hold result packet length
         *
         * @return Result packet, should be free after use
         */
        'prepare_request_data': ['pointer', ['string', 'size_t', 'string', 'size_t', 'uint32', sizePtr]],
        
        'teoSScrSubscribe': ['void', ['pointer', 'string', 'uint16']],
        
        // teoLogPuts(ksnet_cfg *ksn_cfg, const char* module , int type, const char* message);
        'teoLogPuts': ['int', ['pointer', 'string' , 'int', 'string']]
    }),

    /**
     * Get teonet library version
     *
     * @return {'string'} Teonet library version
     */
    version: function () {
        return this.lib.teoGetLibteonetVersion();
    },

    /**
     * Get this host name
     *
     * @param {'pointer'} ke Pointer to ksnetEvMgrClass
     * @returns {'string'} This host name
     */
    host: function (ke) {
        return this.lib.ksnetEvMgrGetHostName(ke);
    },

    /**
     * Set Teonet application type
     *
     * @param {'pointer'} ke Pointer to ksnetEvMgrClass
     * @param {'string'}  type Application type string
     */
    setAppType: function (ke, type) {
        this.lib.teoSetAppType(ke, type);
    },

    /**
     * Set Teonet application version
     *
     * @param {'pointer'} ke Pointer to ksnetEvMgrClass
     * @param {'string'}  version Application version string
     */
    setAppVersion: function (ke, version) {
        this.lib.teoSetAppVersion(ke, version);
    },

    /**
     * Get application version
     *
     * @param {'pointer'} ke Pointer to ksnetEvMgrClass
     * @returns {'string'} This application version
     */
    getAppVersion: function (ke) {
        return this.lib.teoGetAppVersion(ke);
    },

    /**
     * Get application type
     *
     * @param {'pointer'} ke Pointer to ksnetEvMgrClass
     * @returns {'string'} This application version
     */
    getAppType: function (ke) {
        return this.lib.teoGetAppType(ke);
    },

    /**
     *
     * @param {'pointer'} ke Pointer to ksnetEvMgrClass
     * @param {'string'}  peer_name Peer name to get ARP record for
     * @returns {ksnetArpDataPtr} Pointer to ksnetArpData (ksnet_arp_data) or null if "peer_name" peer is absent
     */
    getArp: function (ke, peer_name) {
        return this.lib.ksnetArpGet(ksnCoreClass(ke.kc).ka, peer_name);
    },

    /**
     * Set custom timer interval. The event EV_K_TIMER will be send after
     * every time_interval period.
     *
     * @param {'pointer'} ke Pointer to ksnetEvMgrClass
     * @param {'double'}  time_interval Timer interval
     */
    setCustomTimer: function (ke, time_interval) {
        this.lib.ksnetEvMgrSetCustomTimer(ke, time_interval);
    },

    /**
     * Send request answer data (binary) to Peer or L0 server client (
     *
     * @param {'pointer'} ke Pointer to ksnetEvMgrClass
     * @param {'pointer'|object} rd Pointer to ksnCorePacketData
     * @param {'uint8'} cmd Comand to send
     * @param {'pointer'} out_data Output data
     * @param {'int'} out_data Output data length
     * @returns {'int'|'pointer'}
     */
    sendCmdAnswerToBinary: function (ke, rd, cmd, out_data, out_data_length) {

        var retavl;

        if (rd.l0_f) {
            retavl = this.lib.ksnLNullSendToL0(ke.ksn_cfg.ke, rd.addr, rd.port, rd.from, rd.from_len, cmd, out_data, out_data_length);
        }
        else {
            retavl = this.lib.ksnCoreSendto(ke.kc, rd.addr, rd.port, cmd, out_data, out_data_length);
        }

        return retavl;
    },

    /**
     * Send request answer data (string) to Peer or L0 server client (
     *
     * @param {'pointer'} ke Pointer to ksnetEvMgrClass
     * @param {'pointer'|object} rd Pointer to ksnCorePacketData
     * @param {'uint8'} cmd Comand to send
     * @param {'string'} out_data Output data
     * 
     * @returns {'int'|'pointer'}
     */
    sendCmdAnswerTo: function (ke, rd, cmd, out_data) {
        return this.sendCmdAnswerToBinary(ke, rd, cmd, out_data, getLength(out_data));
    },

    /**
     * Clone an object
     *
     * @param {type} obj
     * @returns {unresolved}
     */
    cloneObject: function(obj) {
        return JSON.parse(JSON.stringify(obj));
        //return Object.assign({}, obj);
    },

    /**
     * Send command with string data to peer
     *
     * @param {'pointer'} ke Pointer to ksnetEvMgrClass
     * @param {'string'} peer_name Peer name to send to
     * @param {'uint8'} cmd Command number
     * @param {'string'} data Commands data
     *
     * @return {'pointer'} Pointer to ksnetArpData (ksnet_arp_data) or null if "to" peer is absent
     */
    sendCmdTo: function (ke, peer_name, cmd, data) {
        return this.lib.ksnCoreSendCmdto(ke.kc, peer_name, cmd, data, getLength(data));
    },

    /**
     * Send command with string data to peer
     *
     * @param {'pointer'} ke Pointer to ksnetEvMgrClass
     * @param {'string'} peer_name Peer name to send to
     * @param {'uint8'} cmd Command number
     * @param {'pointer'} data Commands data
     * @param {'int'} out_data Output data length
     *
     * @return {'pointer'} Pointer to ksnetArpData (ksnet_arp_data) or null if "to" peer is absent
     */
    sendCmdToBinary: function (ke, peer_name, cmd, data, data_length) {
        return this.lib.ksnCoreSendCmdto(ke.kc, peer_name, cmd, data, data_length);
    },

    /**
     * Send command to L0 client
     *
     * @param {'pointer'} ke
     * @param {'string'} addr
     * @param {'int'} port
     * @param {'string'} peer_name
     * @param {'uint8'} cmd
     * @param {'string'} data
     *
     * @returns {'int'}
     */
    sendCmdToClient: function(ke, addr, port, peer_name, cmd, data) {
        return this.lib.ksnLNullSendToL0(ke, addr, port, peer_name, getLength(peer_name), cmd, data, getLength(data));
    },

    /**
     * Send command to L0 client
     *
     * @param {'pointer'} ke
     * @param {'string'} addr
     * @param {'int'} port
     * @param {'string'} peer_name
     * @param {'uint8'} cmd
     * @param {'pointer'} data
     * @param {'int'} out_data Output data length
     *
     * @returns {'int'}
     */
    sendCmdToClientBinary: function(ke, addr, port, peer_name, cmd, data, data_length) {
        return this.lib.ksnLNullSendToL0(ke, addr, port, peer_name, peer_name.length, cmd, data, data_length);
    },

    /**
     * Send Echo command to peer name
     *
     * @param {'pointer'} ke Pointer to ksnetEvMgrClass
     * @param {'pointer'} peer_name Peer name to send to
     * @param {'string'} data Commands data
     *
     * @return {'pointer'} Pointer to ksnet_arp_data or null if "to" peer is absent
     */
    sendCmdEchoTo: function (ke, peer_name, data) {
        return this.lib.ksnCommandSendCmdEcho(ksnCoreClass(ke.kc).kco, peer_name, data, getLength(data));
    },

    /**
     * Convert javascript callback to C library callback
     *
     * @param {type} cqueCb
     * @returns {nm$_ffi.exports.Callback}
     */
    cqueCbPtr: function (cqueCb) {

        var cb = ffi.Callback('void', ['uint32', 'int', 'string'],
            //cqueCb
            function (id, type, data) {
                if(typeof cqueCb === 'function') {
                    cqueCb(id, type, data);
                }
            }
        );

        // hack for node-ffi
        // see: https://github.com/node-ffi/node-ffi/issues/72
        process.on('exit', function () {
            cb;
        });

        return cb;
    },

    /**
     * Add callback to queue
     *
     * @param {ksnetEvMgrClassPtr} ke Pointer to ksnetEvMgrClass
     * @param {'pointer'} cqueCb Callback [function](@ref ksnCQueCallback) or NULL. The teonet event
     *           EV_K_CQUE_CALLBACK should be send at the same time.
     * @param {'double'} timeout Callback timeout. If equal to 0 than timeout sets automatically
     * @param {'pointer'} data The user data which should be send to the Callback function
     *
     * @return Pointer to added ksnCQueData or NULL if error occurred
     */
    cqueAdd: function (ke, cqueCb, timeout, data) {
        return this.lib.ksnCQueAdd(ke.kq, this.cqueCbPtr(cqueCb), timeout, data);
    },

    /**
     * Execute callback queue record
     *
     * Get callback queue record and remove it from queue
     *
     * @param {ksnetEvMgrClassPtr} ke Pointer to ksnetEvMgrClass
     * @param {'uint32'} id Required ID
     *
     * @return {'int'} return 0: if callback executed OK; !=0 some error occurred
     */
    cqueExec: function (ke, id) {
        return this.lib.ksnCQueExec(ke.kq, id);
    },

    /**
     * Execute callback queue record
     *
     * Get callback queue record and remove it from queue
     *
     * @param {ksnetEvMgrClassPtr} ke Pointer to ksnetEvMgrClass
     * @param {'uint32'} id Required ID
     * @param {'string'} data Pointer to callback queue records data
     *
     * @return {'int'} return 0: if callback executed OK; !=0 some error occurred
     */
    cqueSetData: function (ke, id, data) {
        return this.lib.ksnCQueSetData(ke.kq, id, data);
    },

    /**
     * Convert javascript callback to C library callback
     *
     * @param {type} eventCb
     * @returns {nm$_ffi.exports.Callback}
     */
    eventCbPtr: function (eventCb) {

        var cb = ffi.Callback('void', [ksnetEvMgrClassPtr, 'int', ksnCorePacketDataPtr, 'size_t', 'pointer'],
            //eventCb
            function (ke_ptr, ev, data, data_len, user_dat) {
                if(typeof eventCb === 'function') {
                    eventCb(ksnetEvMgrClass(ke_ptr), ev, data, data_len, user_dat);
                }
            }
        );

        // hack for node-ffi
        // see: https://github.com/node-ffi/node-ffi/issues/72
        process.on('exit', function () {
            cb;
        });

        return cb;
    },

    /**
     * Initialize KSNet Event Manager and network
     *
     * @param {'pointer'} eventCb Events callback function called when an event happens
     * @param {int}       options Options set: <br>
     *                      READ_OPTIONS #1 - read options from command line parameters; <br>
     *                      READ_CONFIGURATION #2 - read options from configuration file
     *                      READ_ALL
     *                      APP_PARAM
     *
     * @return Pointer to created ksnetEvMgrClass
     */
    init: function (eventCb, options) {
	let argv = process.argv;
        argv[1] = argv[0] + ' ' + argv[1];
        return this.lib.ksnetEvMgrInit(argv.length - 1, argv.slice(1), this.eventCbPtr(eventCb), options);
    },

    /**
     * Start KSNet Event Manager and network communication
     *
     * @param {'pointer'} ke Pointer to ksnetEvMgrClass
     * @param {function} cb callback for async ffi_call
     * @return {'int'} Alway return 0
     */
    run: function (ke, cb) {

        var self = this;

        // Start teonet
        return self.lib.ksnetEvMgrRun.async(ke, function (err, res) {
            if (err) {
                throw err;
            }

            console.log("Teonet exited, result: " + res);

            if (typeof cb === 'function') {
                cb();
            }
        });
    },

    /**
     * Stop teonet processing
     *
     * @param {'pointer'} ke Pointer to ksnetEvMgrClass
     * @returns {undefined}
     */
    stop: function (ke) {

        if(ke !== null) this.lib.ksnetEvMgrStop(ke);
    },

    /**
     * Initialize and start Teonet
     * @param {string} appType
     * @param {string} appVersion
     * @param {number} initOptionsNumber
     * @param {number} eventInterval
     * @param {function} teoEventCb
     * @param {function} [ffiAsyncCb] - cb callback for async ffi_call
     */
    start: function (appType, appVersion, initOptionsNumber, eventInterval, teoEventCb, ffiAsyncCb) {
        // Initialize teonet event manager and Read configuration
        var ke = this.init(teoEventCb, initOptionsNumber);

        // Set application type
        this.setAppType(ke, appType);

        // Set application version
        this.setAppVersion(ke, appVersion);

        // Start Timer event
        this.setCustomTimer(ke, eventInterval);

        // Start teonet
        this.run(ke, ffiAsyncCb);
    },

    dataToBuffer: function (data, data_length) {
        return ref.reinterpret(data, data_length, 0);
    },

    /**
     * Convert teonet rd data pointer to uint8 array
     *
     * @param {type} data Teonet rd data pointer
     * @param {type} data_length Data length
     * @return {Uint8Array} Data converted to Uint8Array
     */
    dataToUint8Array: function (data, data_length) {
        return new Uint8Array(this.dataToBuffer(data, data_length));
    },

    /**
     * Send event with string data to subscribers
     *
     * @param {'pointer'} ke Pointer to ksnetEvMgrClass
     * @param {int} event Event number
     * @param {string|pointer} data Data string or buffer
     * @param {int} data_length Data length, may be empty for string. If data is string than length should be equal string length + 1.
     * @param {ind} cmd Command number, used for EV_K_RECEIVED event to show received command
     * @return {undefined}
     */
    sendToSscr: function(ke, event, data, data_length, cmd) {
        var buf = Buffer.from(data);
        if(!data_length) buf = Buffer.concat([buf, Buffer.from('\0')], buf.length + 1 );
        this.lib.teoSScrSend(
            ksnCommandClass(ksnCoreClass(ke.kc).kco).ksscr,
            event, buf, buf.length, cmd || 0
        );
    },

    /**
     * Send CMD_SET = 129 to teodb app
     *
     * @param {'pointer'} ke Pointer to ksnetEvMgrClass
     * @param peer_name
     * @param key
     * @param data_len Value length
     * @param id Request ID
     *
     * @return Result packet, should be free after use
     */
    teodbSet: function(ke, peer_name, key, data, id) {
        var req_length = ref.alloc(sizePtr);
        var req = this.lib.prepare_request_data(key, getLength(key), data,
            getLength(data), id, req_length);
        this.sendCmdToBinary(ke, peer_name, 129, req, req_length.readUInt32LE(0)); // req_length.readUInt64LE(0)
    },

    /**
     * Send CMD_GET = 130 to teodb app
     *
     * @param {'pointer'} ke Pointer to ksnetEvMgrClass
     * @param peer_name
     * @param key
     * @param data_len Value length
     * @param id Request ID
     *
     * @return Result packet, should be free after use
     */
    teodbGet: function(ke, peer_name, key, data, id) {
        var req_length = ref.alloc(sizePtr);
        var req = this.lib.prepare_request_data(key, getLength(key), data,
            /*getLength(data)*/0, id, req_length);
        this.sendCmdToBinary(ke, peer_name, 130, req, req_length.readUInt32LE(0)); // req_length.readUInt64LE(0)
     },
     
     subscribe: function(ke, peer, ev) {
         this.lib.teoSScrSubscribe(ksnCommandClass(ksnCoreClass(ke.kc).kco).ksscr, peer, ev);
     },
     
     teoLogPuts: function(ke, level, messages) {
         const message = messages.map(s => { 
             if(s && s.toString) return s.toString();
             else return "log unparsed";
         }).join(' ');
         this.lib.teoLogPuts(ke.ksn_cfg['ref.buffer'], "" , level, message);
     },

    /**
     * Get object for logging to syslog
     *
     * Example of usage:
     * var log = teonet.syslog('teonede', module.filename);
     * log.message('___test1___');
     *
     * Example of log record from native library:
     * teonet:teonode[15]: MESSAGE event_manager:ksnetEvMgrRun:(ev_mgr.c:259): started ...
     *
     * @param {string} moduleName - name of module
     * @param {string} modulePath - file name or full path to file via module.filename (recommended)
     * @return {{message: message, error: error, debug: debug}}
     */
    syslog: function (moduleName, modulePath) {
        var self = this;

        return {
            message: function (msg) {
                /* LOG_NOTICE normal but significant condition */
                self.lib.syslog(5, 'MESSAGE ' + moduleName + '::(' + modulePath + ':): ' + msg);
            },
            error: function (err, msg) {
                /* LOG_ERR error conditions */
                self.lib.syslog(3, 'ERROR_M ' + moduleName + '::(' + modulePath + ':): ' + (msg ? msg + '; ' : '') + err.stack);
            },
            debug: function (msg) {
                /* LOG_INFO informational */
                self.lib.syslog(6, 'DEBUG ' + moduleName + '::(' + modulePath + ':): ' + msg);
            }
        };
    }
};
